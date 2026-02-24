from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.employee import Base, Department, Employee
from app.models.leave import LeaveType
from app.core.security import get_password_hash
from datetime import date
import uuid

def seed():
    db = SessionLocal()

    # 1. Create Departments
    departments = [
        Department(name="Engineering", description="Software Development"),
        Department(name="Human Resources", description="People and Culture"),
        Department(name="Management", description="Organizational leadership"),
    ]
    for d in departments:
        if not db.query(Department).filter(Department.name == d.name).first():
            db.add(d)
    db.commit()

    # 2. Create Leave Types
    leave_types = [
        LeaveType(name="Annual", default_days=14),
        LeaveType(name="Sick", default_days=7),
        LeaveType(name="Casual", default_days=7),
    ]
    for lt in leave_types:
        if not db.query(LeaveType).filter(LeaveType.name == lt.name).first():
            db.add(lt)
    db.commit()

    # 3. Create Admin User
    hr_dept = db.query(Department).filter(Department.name == "Human Resources").first()
    admin = db.query(Employee).filter(Employee.email == "admin@company.com").first()
    if not admin:
        admin = Employee(
            employee_code="ADM001",
            full_name="System Admin",
            email="admin@company.com",
            role="admin",
            department_id=hr_dept.id,
            hire_date=date(2023, 1, 1),
            password_hash=get_password_hash("admin123"),
            status="active"
        )
        db.add(admin)

    # 4. Create HR User
    hr_staff = db.query(Employee).filter(Employee.email == "hr@company.com").first()
    if not hr_staff:
        hr_staff = Employee(
            employee_code="HR001",
            full_name="Jane HR",
            email="hr@company.com",
            role="hr_staff",
            department_id=hr_dept.id,
            hire_date=date(2023, 2, 1),
            password_hash=get_password_hash("hr123"),
            status="active"
        )
        db.add(hr_staff)

    # 5. Create Sample Employee
    eng_dept = db.query(Department).filter(Department.name == "Engineering").first()
    emp = db.query(Employee).filter(Employee.email == "employee@company.com").first()
    if not emp:
        emp = Employee(
            employee_code="ENG001",
            full_name="John Developer",
            email="employee@company.com",
            role="employee",
            department_id=eng_dept.id,
            hire_date=date(2023, 3, 1),
            password_hash=get_password_hash("emp123"),
            status="active"
        )
        db.add(emp)

    db.commit()
    db.close()

if __name__ == "__main__":
    print("Seeding database...")
    seed()
    print("Seeding complete.")
