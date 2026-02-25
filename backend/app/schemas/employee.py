from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from uuid import UUID

class EmployeeBase(BaseModel):
    employee_code: str
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    department_id: Optional[UUID] = None
    role: Optional[str] = "employee"
    status: Optional[str] = "active"
    hire_date: date
    base_salary: Optional[float] = 0.0
    hourly_rate: Optional[float] = 0.0

class EmployeeCreate(EmployeeBase):
    password: str

class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    department_id: Optional[UUID] = None
    role: Optional[str] = None
    status: Optional[str] = None

class EmployeeOut(EmployeeBase):
    id: UUID
    face_enrolled: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
