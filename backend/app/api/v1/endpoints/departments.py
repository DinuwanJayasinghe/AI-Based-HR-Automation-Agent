from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.employee import Department

router = APIRouter()

@router.get("/", response_model=List[Any])
def get_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()

@router.post("/", response_model=Any, dependencies=[Depends(deps.RoleChecker(["admin"]))])
def create_department(name: str, description: str, db: Session = Depends(get_db)):
    dept = Department(name=name, description=description)
    db.add(dept)
    db.commit()
    db.refresh(dept)
    return dept
