from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from uuid import UUID
from pydantic import BaseModel

from app.api import deps
from app.db.session import get_db
from app.models.recruitment import JobPosting, Candidate
from app.models.employee import Employee

router = APIRouter()

class JobCreate(BaseModel):
    title: str
    department_id: UUID
    description: str
    requirements: dict

@router.post("/jobs", response_model=Any)
def create_job(
    job_in: JobCreate,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    job = JobPosting(
        title=job_in.title,
        department_id=job_in.department_id,
        description=job_in.description,
        requirements=job_in.requirements,
        created_by=current_user.id
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

@router.get("/jobs", response_model=List[Any])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(JobPosting).filter(JobPosting.status == "open").all()

@router.post("/apply/{job_id}")
async def apply_job(
    job_id: UUID,
    full_name: str,
    email: str,
    phone: str,
    db: Session = Depends(get_db)
):
    candidate = Candidate(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        status="applied",
        resume_score=0.85, # Simulated AI score
        ai_report={"summary": "Strong candidate with relevant experience."}
    )
    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    return candidate

@router.get("/candidates/{job_id}")
def get_candidates(
    job_id: UUID,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    return db.query(Candidate).filter(Candidate.job_id == job_id).order_by(Candidate.resume_score.desc()).all()

@router.get("/report/{candidate_id}")
def get_candidate_report(
    candidate_id: UUID,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate.ai_report

@router.post("/interview/start")
async def start_interview(candidate_id: UUID, db: Session = Depends(get_db)):
    # Logic to initiate AI interview session
    return {"session_id": "int-123", "first_question": "Tell us about your experience with FastAPI."}

@router.post("/interview/respond")
async def respond_interview(session_id: str, response: str, db: Session = Depends(get_db)):
    # AI logic to process response and return next question
    return {"next_question": "How do you handle background tasks?"}
