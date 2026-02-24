from fastapi import APIRouter, Depends, HTTPException
from app.api import deps
from app.models.employee import Employee
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from app.core.config import settings
from pydantic import BaseModel

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    session_id: str

@router.post("/message")
async def chat_message(
    chat_in: ChatMessage,
    current_user: Employee = Depends(deps.get_current_active_user)
):
    # In a real app, we'd use LangChain with memory and tools
    # tools = [get_leave_balance, get_attendance_history, etc.]

    # Simple mock response
    return {
        "response": f"Hello {current_user.full_name}, how can I help you today?",
        "session_id": chat_in.session_id
    }
