from fastapi import APIRouter
from app.api.v1.endpoints import (
    employees, auth, attendance, leave, performance, recruitment, chat, notifications, reports, departments, websockets, salary, compensation
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(departments.router, prefix="/departments", tags=["departments"])
api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
api_router.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
api_router.include_router(leave.router, prefix="/leave", tags=["leave"])
api_router.include_router(performance.router, prefix="/performance", tags=["performance"])
api_router.include_router(recruitment.router, prefix="/recruitment", tags=["recruitment"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(salary.router, prefix="/salary", tags=["salary"])
api_router.include_router(compensation.router, prefix="/compensation", tags=["compensation"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(websockets.router, tags=["websockets"])
