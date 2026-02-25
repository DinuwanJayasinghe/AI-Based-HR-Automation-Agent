from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.salary import SalaryRecord
from app.models.employee import Employee, Department
from app.core.salary_engine import calculate_monthly_salary
from app.core.pdf_generator import generate_payslip_pdf
from fastapi.responses import Response
import hashlib
from pydantic import BaseModel

router = APIRouter()

class SalaryProcessRequest(BaseModel):
    employee_id: str
    year: int
    month: int

@router.post("/calculate", response_model=Any)
def api_calculate_salary(
    req: SalaryProcessRequest,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    result = calculate_monthly_salary(db, req.employee_id, req.year, req.month)
    if not result:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Check if record already exists
    existing = db.query(SalaryRecord).filter(
        SalaryRecord.employee_id == req.employee_id,
        SalaryRecord.month == result["month"]
    ).first()

    if existing:
        for key, value in result.items():
            setattr(existing, key, value)
        db.add(existing)
        db.commit()
        db.refresh(existing)
        return existing

    db_obj = SalaryRecord(**result)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/history/{employee_id}")
def get_salary_history(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    if current_user.role not in ["admin", "management"] and str(current_user.id) != employee_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    return db.query(SalaryRecord).filter(SalaryRecord.employee_id == employee_id).order_by(SalaryRecord.month.desc()).all()

@router.get("/summary")
def get_salary_summary(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "management"]))
):
    # Total salary cost for the organization
    from sqlalchemy import func
    summary = db.query(
        SalaryRecord.month,
        func.sum(SalaryRecord.net_salary).label("total_cost")
    ).group_by(SalaryRecord.month).all()
    return [{"month": s[0], "total_cost": s[1]} for s in summary]

@router.get("/payslip/{record_id}")
def download_payslip(
    record_id: str,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    record = db.query(SalaryRecord).filter(SalaryRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Salary record not found")

    if current_user.role not in ["admin", "management"] and record.employee_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")

    employee = db.query(Employee).filter(Employee.id == record.employee_id).first()
    dept = db.query(Department).filter(Department.id == employee.department_id).first()

    # Generate verification hash
    v_hash = hashlib.sha256(f"{record.id}-{record.net_salary}-{record.month}".encode()).hexdigest()

    data = {
        "month": record.month,
        "employee_name": employee.full_name,
        "employee_code": employee.employee_code,
        "department": dept.name if dept else "N/A",
        "role": employee.role,
        "base_salary": record.base_salary,
        "overtime_hours": record.overtime_hours,
        "overtime_pay": record.overtime_pay,
        "bonus": record.bonus,
        "penalties": record.penalties,
        "leave_deductions": record.leave_deductions,
        "net_salary": record.net_salary,
        "verification_hash": v_hash[:16].upper()
    }

    pdf_content = generate_payslip_pdf(data)

    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=payslip_{record.month}_{employee.employee_code}.pdf"}
    )
