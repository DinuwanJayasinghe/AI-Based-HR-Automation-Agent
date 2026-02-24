from sqlalchemy import Column, String, Integer, Date, DateTime, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class LeaveType(Base):
    __tablename__ = "leave_types"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(50), unique=True, nullable=False) # Annual, Sick, Casual, etc.
    description = Column(Text)
    default_days = Column(Integer)

class LeaveApplication(Base):
    __tablename__ = "leave_applications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    leave_type_id = Column(UUID(as_uuid=True), ForeignKey("leave_types.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    duration_days = Column(Integer, nullable=False)
    reason = Column(Text)
    status = Column(String(20), default="pending") # pending, approved, rejected, escalated
    ai_decision = Column(String(20))
    ai_explanation = Column(Text)
    policy_references = Column(JSON)
    reviewed_by = Column(UUID(as_uuid=True), ForeignKey("employees.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
