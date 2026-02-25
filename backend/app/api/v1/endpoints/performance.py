from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import datetime

from app.api import deps
from app.db.session import get_db
from app.models.performance import PerformanceEvaluation
from app.models.attendance import AttendanceRecord
from app.models.employee import Employee
from app.core.websocket_manager import manager

router = APIRouter()

@router.get("/{employee_id}", response_model=List[Any])
def get_performance_history(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "hr_staff", "management"] and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    return db.query(PerformanceEvaluation).filter(PerformanceEvaluation.employee_id == employee_id).all()

@router.post("/evaluate")
def evaluate_performance(
    employee_id: UUID,
    period: str, # e.g. "2024-05"
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    # Simplified calculation logic
    attendance_records = db.query(AttendanceRecord).filter(
        AttendanceRecord.employee_id == employee_id,
        # filter by period logic
    ).all()

    punctuality = 100.0 # Placeholder
    if attendance_records:
        late_count = len([r for r in attendance_records if r.status == "late"])
        punctuality = max(0, 100 - (late_count * 5))

    overall_score = punctuality # Simplified

    evaluation = PerformanceEvaluation(
        employee_id=employee_id,
        evaluation_period=period,
        punctuality_score=punctuality,
        attendance_score=punctuality, # Simplified
        overtime_hours=0.0,
        overall_score=overall_score,
        status="completed",
        ai_summary=f"Punctuality score is {punctuality}%. Keep up the good work." if punctuality > 80 else "Punctuality needs improvement."
    )
    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    # Real-time notification for performance evaluation
    import asyncio
    asyncio.create_task(manager.send_personal_message({
        "type": "notification",
        "data": {
            "message": f"Your performance evaluation for {period} is ready. Score: {overall_score}",
            "type": "info"
        }
    }, str(employee_id)))

    return evaluation

@router.get("/{employee_id}/score")
def get_latest_score(
    employee_id: UUID,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "hr_staff", "management"] and current_user.id != employee_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    latest = db.query(PerformanceEvaluation).filter(PerformanceEvaluation.employee_id == employee_id).order_by(PerformanceEvaluation.created_at.desc()).first()
    return latest.overall_score if latest else 0.0

@router.get("/team/{dept_id}")
def get_team_performance(
    dept_id: UUID,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    # Join with employees to filter by department
    return db.query(PerformanceEvaluation).join(Employee).filter(Employee.department_id == dept_id).all()

@router.post("/{eval_id}/appeal")
def appeal_evaluation(
    eval_id: UUID,
    reason: str,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    evaluation = db.query(PerformanceEvaluation).filter(PerformanceEvaluation.id == eval_id).first()
    if not evaluation or evaluation.employee_id != current_user.id:
        raise HTTPException(status_code=404, detail="Evaluation not found")

    # Store appeal logic (could be in MongoDB or a separate table)
    evaluation.status = "appealed"
    db.add(evaluation)
    db.commit()
    return {"message": "Appeal submitted successfully"}
