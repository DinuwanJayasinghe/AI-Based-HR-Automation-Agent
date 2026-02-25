from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.models.employee import Employee
from pydantic import BaseModel
import redis
import json
from app.core.config import settings
from app.core.websocket_manager import manager

router = APIRouter()
redis_client = redis.from_url(settings.REDIS_URL)

class NotificationSend(BaseModel):
    user_id: str
    message: str
    type: str # info, warning, error

@router.post("/send")
async def send_notification(
    notification: NotificationSend,
    current_user: Employee = Depends(deps.RoleChecker(["admin", "hr_staff"]))
):
    # Real-time WebSocket notification
    await manager.send_personal_message({
        "type": "notification",
        "data": notification.dict()
    }, notification.user_id)

    # Logic to push to Redis for microservice to consume (Email/SMS)
    redis_client.publish('notifications', json.dumps(notification.dict()))

    # Also store in MongoDB (mocked here)
    # await mongodb.db.notifications.insert_one(notification.dict())

    return {"status": "queued"}

@router.get("/")
async def get_my_notifications(
    current_user: Employee = Depends(deps.get_current_active_user)
):
    # In real app, fetch from MongoDB
    return []

@router.put("/{id}/read")
async def mark_read(id: str, current_user: Employee = Depends(deps.get_current_active_user)):
    return {"status": "success"}

@router.get("/preferences")
def get_preferences(current_user: Employee = Depends(deps.get_current_active_user)):
    return {"email": True, "in_app": True}
