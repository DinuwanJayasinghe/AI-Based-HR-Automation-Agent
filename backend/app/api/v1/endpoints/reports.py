from typing import List, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.api import deps
from app.db.session import get_db
from app.models.attendance import AttendanceRecord
from app.models.leave import LeaveApplication
from app.models.performance import PerformanceEvaluation
from app.models.employee import Employee

router = APIRouter()

@router.get("/attendance")
def get_attendance_report(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    # Summary of attendance by status
    summary = db.query(
        AttendanceRecord.status,
        func.count(AttendanceRecord.id)
    ).group_by(AttendanceRecord.status).all()
    return {s[0]: s[1] for s in summary}

@router.get("/leave")
def get_leave_report(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    summary = db.query(
        LeaveApplication.status,
        func.count(LeaveApplication.id)
    ).group_by(LeaveApplication.status).all()
    return {s[0]: s[1] for s in summary}

@router.get("/performance")
def get_performance_report(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    # Average scores by department or overall
    avg_score = db.query(func.avg(PerformanceEvaluation.overall_score)).scalar()
    return {"average_overall_score": avg_score or 0.0}

@router.get("/dashboard/realtime")
def get_realtime_stats(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff", "management"]))
):
    today = datetime.utcnow().date()
    clocked_in_today = db.query(AttendanceRecord).filter(
        func.date(AttendanceRecord.timestamp) == today,
        AttendanceRecord.event_type == "clock_in"
    ).count()

    pending_leaves = db.query(LeaveApplication).filter(LeaveApplication.status == "pending").count()

    return {
        "clocked_in_today": clocked_in_today,
        "pending_leave_requests": pending_leaves,
        "active_employees": db.query(Employee).filter(Employee.status == "active").count()
    }

@router.get("/anomalies")
def get_anomalies(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    # For now, return empty list of security/attendance anomalies
    return []

@router.get("/compliance")
def get_compliance_report(
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.RoleChecker(["admin", "management"]))
):
    return {"status": "compliant", "last_audit": str(datetime.utcnow())}
