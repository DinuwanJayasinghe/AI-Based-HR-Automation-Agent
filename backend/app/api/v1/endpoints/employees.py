from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.api import deps
from app.core.security import get_password_hash
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeOut, EmployeeUpdate

router = APIRouter()

@router.post("/register", response_model=EmployeeOut, dependencies=[Depends(deps.RoleChecker(["admin", "hr_staff"]))])
def register_employee(
    *,
    db: Session = Depends(deps.get_db),
    employee_in: EmployeeCreate
) -> Any:
    user = db.query(Employee).filter(Employee.email == employee_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = db.query(Employee).filter(Employee.employee_code == employee_in.employee_code).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this employee code already exists in the system.",
        )

    db_obj = Employee(
        employee_code=employee_in.employee_code,
        full_name=employee_in.full_name,
        email=employee_in.email,
        phone=employee_in.phone,
        department_id=employee_in.department_id,
        role=employee_in.role,
        status=employee_in.status,
        hire_date=employee_in.hire_date,
        password_hash=get_password_hash(employee_in.password),
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[EmployeeOut], dependencies=[Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))])
def read_employees(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    employees = db.query(Employee).offset(skip).limit(limit).all()
    return employees

@router.get("/{id}", response_model=EmployeeOut)
def read_employee_by_id(
    id: UUID,
    current_user: Employee = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
    if current_user.role not in ["admin", "hr_staff", "management"] and current_user.id != id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    employee = db.query(Employee).filter(Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.put("/{id}", response_model=EmployeeOut)
def update_employee(
    *,
    db: Session = Depends(deps.get_db),
    id: UUID,
    employee_in: EmployeeUpdate,
    current_user: Employee = Depends(deps.get_current_active_user),
) -> Any:
    employee = db.query(Employee).filter(Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    if current_user.role not in ["admin", "hr_staff"] and current_user.id != id:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    update_data = employee_in.dict(exclude_unset=True)

    # Restrict role/status updates to admin/hr_staff
    if "role" in update_data or "status" in update_data:
        if current_user.role not in ["admin", "hr_staff"]:
            update_data.pop("role", None)
            update_data.pop("status", None)

    for field, value in update_data.items():
        setattr(employee, field, value)

    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

@router.post("/{id}/enroll-face", dependencies=[Depends(deps.RoleChecker(["admin", "hr_staff"]))])
def enroll_face(
    id: UUID,
    db: Session = Depends(deps.get_db),
):
    # This will be implemented in Module 2
    return {"message": "Face enrollment initiated"}
