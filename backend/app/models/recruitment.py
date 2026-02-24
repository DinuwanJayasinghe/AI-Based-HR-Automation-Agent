from sqlalchemy import Column, String, Text, ForeignKey, JSON, Float, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.employee import Base

class JobPosting(Base):
    __tablename__ = "job_postings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(200), nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id"))
    description = Column(Text)
    requirements = Column(JSON)
    status = Column(String(20), default="open")
    created_by = Column(UUID(as_uuid=True), ForeignKey("employees.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class Candidate(Base):
    __tablename__ = "candidates"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    job_id = Column(UUID(as_uuid=True), ForeignKey("job_postings.id"))
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20))
    resume_url = Column(String(500))
    resume_score = Column(Float)
    interview_score = Column(Float)
    overall_rank = Column(Integer)
    status = Column(String(20), default="applied")
    ai_report = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
