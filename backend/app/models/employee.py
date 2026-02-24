from sqlalchemy import Column, String, Boolean, Date, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Department(Base):
    __tablename__ = "departments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)

class Employee(Base):
    __tablename__ = "employees"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_code = Column(String(20), unique=True, nullable=False)
    full_name = Column(String(200), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20))
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id"))
    role = Column(String(20), default="employee") # employee, hr_staff, admin, management
    status = Column(String(20), default="active") # active, inactive, on_leave, terminated
    hire_date = Column(Date, nullable=False)
    face_enrolled = Column(Boolean, default=False)
    password_hash = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class FaceEmbedding(Base):
    __tablename__ = "face_embeddings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    employee_id = Column(UUID(as_uuid=True), ForeignKey("employees.id"), unique=True)
    embedding_vector = Column(Text, nullable=False) # Store as encrypted string or base64
    enrolled_at = Column(DateTime, default=datetime.utcnow)
