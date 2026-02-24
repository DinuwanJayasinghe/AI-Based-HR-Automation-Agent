from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class AttendanceRecord(Base):
    __tablename__ = "attendance_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    event_type = Column(String(10), nullable=False)  # clock_in / clock_out
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    confidence_score = Column(Float)
    status = Column(String(20), default="on_time") # on_time, late, early_departure
    created_at = Column(DateTime, default=datetime.utcnow)
