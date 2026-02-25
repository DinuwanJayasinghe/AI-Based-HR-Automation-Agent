from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from app.api import deps
from app.db.session import get_db
from app.models.attendance import AttendanceRecord
from app.models.employee import Employee, FaceEmbedding
from app.core.face_recognition import decode_image, get_face_embedding
from app.core.websocket_manager import manager
import numpy as np

router = APIRouter()

@router.post("/mark")
async def mark_attendance(
    image_data: str, # Base64 encoded image
    event_type: str, # clock_in or clock_out
    db: Session = Depends(get_db)
):
    img = decode_image(image_data)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image data")

    # 1. Get embedding from current frame
    current_embedding = get_face_embedding(img)
    if not current_embedding:
        # Log anomaly (unrecognized face)
        return {"status": "unrecognized", "message": "No face detected or embedding failed"}

    # 2. Match against database
    all_embeddings = db.query(FaceEmbedding).all()

    best_match_employee_id = None
    min_distance = 1.0 # Cosine distance
    threshold = 0.4

    import json
    for db_emb in all_embeddings:
        db_vector = np.array(json.loads(db_emb.embedding_vector))
        curr_vector = np.array(current_embedding)

        # Cosine distance
        dist = 1 - np.dot(db_vector, curr_vector) / (np.linalg.norm(db_vector) * np.linalg.norm(curr_vector))

        if dist < min_distance:
            min_distance = dist
            best_match_employee_id = db_emb.employee_id

    if best_match_employee_id and min_distance < threshold:
        # 3. Record attendance if matched
        employee = db.query(Employee).filter(Employee.id == best_match_employee_id).first()
        record = AttendanceRecord(
            employee_id=best_match_employee_id,
            event_type=event_type,
            timestamp=datetime.utcnow(),
            confidence_score=float(1 - min_distance),
            status="on_time" # Simplified
        )
        db.add(record)
        db.commit()

        # Broadcast update for real-time dashboard
        await manager.broadcast({
            "type": "dashboard_update",
            "event": "attendance_marked",
            "data": {
                "employee_name": employee.full_name,
                "timestamp": str(record.timestamp),
                "event_type": event_type
            }
        })

        return {"status": "marked", "employee_name": employee.full_name}

    return {"status": "unrecognized", "message": "Face not recognized"}

@router.get("/history/{employee_id}")
def get_attendance_history(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "hr_staff"] and str(current_user.id) != employee_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    records = db.query(AttendanceRecord).filter(AttendanceRecord.employee_id == employee_id).all()
    return records
