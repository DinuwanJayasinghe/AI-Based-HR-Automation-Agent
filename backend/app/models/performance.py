from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class PerformanceEvaluation(Base):
    __tablename__ = "performance_evaluations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    evaluation_period = Column(String(7), nullable=False) # e.g. '2026-02'
    punctuality_score = Column(Float)
    attendance_score = Column(Float)
    overtime_hours = Column(Float)
    overall_score = Column(Float)
    evaluation_data = Column(JSON)
    ai_summary = Column(String)
    status = Column(String(20), default="draft")
    created_at = Column(DateTime, default=datetime.utcnow)
