from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.compensation import CompensationRecord
from app.models.employee import Employee
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class CompensationCreate(BaseModel):
    employee_id: str
    type: str # bonus, incentive, penalty, allowance
    amount: float
    description: str

@router.post("/", response_model=Any)
def create_compensation(
    comp_in: CompensationCreate,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    db_obj = CompensationRecord(
        employee_id=comp_in.employee_id,
        type=comp_in.type,
        amount=comp_in.amount,
        description=comp_in.description,
        created_by=current_user.id
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/employee/{employee_id}")
def get_employee_compensations(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "management"] and str(current_user.id) != employee_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    return db.query(CompensationRecord).filter(CompensationRecord.employee_id == employee_id).all()

@router.put("/{comp_id}/status")
def update_compensation_status(
    comp_id: str,
    status: str, # approved, rejected
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "management"]))
):
    comp = db.query(CompensationRecord).filter(CompensationRecord.id == comp_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Compensation record not found")

    comp.status = status
    if status == "approved":
        comp.approved_at = datetime.utcnow()

    db.add(comp)
    db.commit()
    db.refresh(comp)
    return comp
