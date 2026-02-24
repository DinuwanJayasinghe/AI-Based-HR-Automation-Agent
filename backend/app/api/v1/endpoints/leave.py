from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.leave import LeaveApplication
from app.models.employee import Employee
from app.core.ai_workflows import process_leave_application
from pydantic import BaseModel
from datetime import date
from uuid import UUID

router = APIRouter()

class LeaveApplyRequest(BaseModel):
    leave_type_id: UUID
    start_date: date
    end_date: date
    reason: str

@router.post("/apply")
async def apply_leave(
    request: LeaveApplyRequest,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    # 1. Prepare data for AI
    employee_data = {
        "name": current_user.full_name,
        "role": current_user.role,
        "department_id": str(current_user.department_id)
    }

    request_data = {
        "start_date": str(request.start_date),
        "end_date": str(request.end_date),
        "reason": request.reason
    }

    # 2. Run AI Workflow
    ai_result = await process_leave_application(employee_data, request_data)

    # 3. Save to database
    db_obj = LeaveApplication(
        employee_id=current_user.id,
        leave_type_id=request.leave_type_id,
        start_date=request.start_date,
        end_date=request.end_date,
        duration_days=(request.end_date - request.start_date).days + 1,
        reason=request.reason,
        status=ai_result["decision"].lower() if ai_result["decision"] != "ESCALATE" else "pending",
        ai_decision=ai_result["decision"],
        ai_explanation=ai_result["explanation"],
        policy_references=ai_result["policy_refs"]
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    return db_obj

@router.get("/my-leaves")
def get_my_leaves(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    return db.query(LeaveApplication).filter(LeaveApplication.employee_id == current_user.id).all()
