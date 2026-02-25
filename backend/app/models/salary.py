from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class SalaryRecord(Base):
    __tablename__ = "salary_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    month = Column(String(7), nullable=False) # e.g. "2024-05"
    base_salary = Column(Float, nullable=False)
    overtime_hours = Column(Float, default=0.0)
    overtime_pay = Column(Float, default=0.0)
    bonus = Column(Float, default=0.0)
    penalties = Column(Float, default=0.0)
    leave_deductions = Column(Float, default=0.0)
    net_salary = Column(Float, nullable=False)
    status = Column(String(20), default="draft") # draft, processed, paid
    calculation_log = Column(JSON) # Audit trail of calculation steps
    created_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)
