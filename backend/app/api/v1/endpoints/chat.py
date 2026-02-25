from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.employee import Employee
from app.models.leave import LeaveApplication
from app.models.performance import PerformanceEvaluation
from app.core.config import settings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel
import json

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    session_id: str

def get_user_context(user: Employee, db: Session):
    # Fetch relevant data for the user to ground the AI
    leaves = db.query(LeaveApplication).filter(LeaveApplication.employee_id == user.id).all()
    performance = db.query(PerformanceEvaluation).filter(PerformanceEvaluation.employee_id == user.id).order_by(PerformanceEvaluation.created_at.desc()).first()

    return {
        "name": user.full_name,
        "role": user.role,
        "department": str(user.department_id),
        "leaves": [f"{l.start_date} to {l.end_date}: {l.status}" for l in leaves[:3]],
        "latest_performance_score": performance.overall_score if performance else "N/A"
    }

@router.post("/message")
async def chat_message(
    chat_in: ChatMessage,
    db: Session = Depends(get_db),
    current_user: Employee = Depends(deps.get_current_active_user)
):
    user_context = get_user_context(current_user, db)

    if not settings.GOOGLE_API_KEY:
        return {
            "response": f"Hi {current_user.full_name}, I am your HR assistant. (AI service not configured, but I know you are in {user_context['department']})",
            "session_id": chat_in.session_id
        }

    llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=settings.GOOGLE_API_KEY)

    system_prompt = f"""
    You are an AI HR Assistant for organizational employees.
    User Profile: {json.dumps(user_context)}

    Guidelines:
    1. Ground all answers in organizational context.
    2. Support English, Sinhala, and Tamil. Respond in the same language as the user.
    3. You can help with leave queries, performance questions, and general HR policy.
    4. Be professional and helpful.
    """

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=chat_in.message)
    ]

    try:
        response = llm.invoke(messages)
        return {
            "response": response.content,
            "session_id": chat_in.session_id
        }
    except Exception as e:
        return {
            "response": f"Sorry, I encountered an error: {str(e)}",
            "session_id": chat_in.session_id
        }
