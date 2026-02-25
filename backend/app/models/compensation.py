from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class CompensationRecord(Base):
    __tablename__ = "compensation_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    type = Column(String(50), nullable=False) # bonus, incentive, penalty, allowance
    amount = Column(Float, nullable=False)
    description = Column(Text)
    status = Column(String(20), default="pending") # pending, approved, rejected
    created_by = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    approved_at = Column(DateTime, nullable=True)
