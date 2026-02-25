from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.models.attendance import AttendanceRecord
from app.models.leave import LeaveApplication
from app.models.compensation import CompensationRecord
from app.models.salary import SalaryRecord
from datetime import datetime, date
import calendar

def calculate_monthly_salary(db: Session, employee_id: str, year: int, month: int):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        return None

    # Date range for the month
    _, last_day = calendar.monthrange(year, month)
    start_date = datetime(year, month, 1)
    end_date = datetime(year, month, last_day, 23, 59, 59)

    # 1. Base Salary
    base_salary = employee.base_salary or 0.0

    # 2. Overtime (Mock logic: sum of extra hours from attendance or separate OT tracking)
    # For now, let's assume we have a way to calculate OT hours
    overtime_hours = 0.0 # Placeholder
    overtime_pay = overtime_hours * (employee.hourly_rate or 0.0)

    # 3. Bonuses & Penalties (from compensation_records)
    compensations = db.query(CompensationRecord).filter(
        CompensationRecord.employee_id == employee_id,
        CompensationRecord.created_at >= start_date,
        CompensationRecord.created_at <= end_date,
        CompensationRecord.status == "approved"
    ).all()

    bonus = sum(c.amount for c in compensations if c.type in ["bonus", "incentive", "allowance"])
    penalties = sum(c.amount for c in compensations if c.type == "penalty")

    # 4. Leave Deductions (Unpaid leaves)
    unpaid_leaves = db.query(LeaveApplication).filter(
        LeaveApplication.employee_id == employee_id,
        LeaveApplication.status == "approved",
        LeaveApplication.start_date >= start_date.date(),
        LeaveApplication.end_date <= end_date.date()
        # Add logic for "Unpaid" leave type if exists
    ).all()

    # Simple deduction: (Base Salary / 22) * days
    leave_deductions = sum(l.duration_days for l in unpaid_leaves) * (base_salary / 22.0) if unpaid_leaves else 0.0

    # Final Calculation
    net_salary = base_salary + overtime_pay + bonus - penalties - leave_deductions

    calculation_log = {
        "base_salary": base_salary,
        "overtime_hours": overtime_hours,
        "overtime_pay": overtime_pay,
        "bonus": bonus,
        "penalties": penalties,
        "leave_deductions": leave_deductions,
        "net_salary": net_salary,
        "calculated_at": str(datetime.utcnow())
    }

    return {
        "employee_id": employee_id,
        "month": f"{year}-{month:02d}",
        "base_salary": base_salary,
        "overtime_hours": overtime_hours,
        "overtime_pay": overtime_pay,
        "bonus": bonus,
        "penalties": penalties,
        "leave_deductions": leave_deductions,
        "net_salary": net_salary,
        "calculation_log": calculation_log
    }
