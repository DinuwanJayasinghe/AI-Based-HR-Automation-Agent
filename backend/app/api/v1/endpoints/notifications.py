from fastapi import APIRouter, Depends
from app.api import deps
from app.models.employee import Employee
from pydantic import BaseModel

router = APIRouter()

class NotificationSend(BaseModel):
    user_id: str
    message: str
    type: str # info, warning, error

@router.post("/send")
async def send_notification(
    notification: NotificationSend,
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    # Logic to push to Redis for microservice to consume
    return {"status": "queued"}

@router.get("/")
async def get_my_notifications(
    current_user: Employee = Depends(deps.get_current_active_user)
):
    # Fetch from MongoDB
    return []
