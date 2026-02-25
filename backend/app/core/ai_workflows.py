from typing import Annotated, TypedDict, Union, List
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from app.core.config import settings
from app.core.rag import query_policy
import json

class LeaveState(TypedDict):
    employee_data: dict
    request_data: dict
    policy_chunks: List[str]
    decision: str
    explanation: str
    policy_refs: List[str]
    status: str

def leave_approval_workflow():
    workflow = StateGraph(LeaveState)

    def fetch_data(state: LeaveState):
        # Already provided in state
        return state

    def retrieve_policy(state: LeaveState):
        query = f"Leave policy for {state['request_data']['leave_type_id']} for {state['employee_data']['role']}"
        state["policy_chunks"] = query_policy(query)
        return state

    def ai_decision_engine(state: LeaveState):
        if not settings.GOOGLE_API_KEY:
            # Fallback to simple rule-based logic if no API key
            state["decision"] = "APPROVE"
            state["explanation"] = "Your leave request is within your remaining balance and complies with the annual leave policy. (Simulated)"
            state["policy_refs"] = ["Annual Leave Policy Section 1.2"]
            return state

        llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=settings.GOOGLE_API_KEY)

        prompt = f"""
        Evaluate leave request for {state['employee_data']['name']}.

        CONTEXT:
        Employee Profile: {state['employee_data']}
        Leave Request: {state['request_data']}
        Company Policies (Retrieved): {state['policy_chunks']}

        CRITERIA:
        1. Check leave balance.
        2. Check attendance score (if provided in profile).
        3. Check performance trends.
        4. Match against retrieved company policy chunks.

        Decision must be APPROVE, REJECT, or ESCALATE.
        Provide a transparent, plain-English explanation.
        Return JSON format: {{"decision": "...", "explanation": "...", "policy_refs": [...]}}
        """

        try:
            response = llm.invoke([HumanMessage(content=prompt)])
            result = json.loads(response.content)
            state["decision"] = result.get("decision", "ESCALATE")
            state["explanation"] = result.get("explanation", "Please contact HR for manual review.")
            state["policy_refs"] = result.get("policy_refs", [])
        except Exception as e:
            state["decision"] = "ESCALATE"
            state["explanation"] = f"Error processing AI decision: {str(e)}"

        return state

    workflow.add_node("fetch_data", fetch_data)
    workflow.add_node("retrieve_policy", retrieve_policy)
    workflow.add_node("ai_decision", ai_decision_engine)

    workflow.set_entry_point("fetch_data")
    workflow.add_edge("fetch_data", "retrieve_policy")
    workflow.add_edge("retrieve_policy", "ai_decision")
    workflow.add_edge("ai_decision", END)

    return workflow.compile()

async def process_leave_application(employee_data, request_data):
    app = leave_approval_workflow()
    initial_state = {
        "employee_data": employee_data,
        "request_data": request_data,
        "policy_chunks": [],
        "decision": "",
        "explanation": "",
        "policy_refs": [],
        "status": "pending"
    }
    final_state = await app.ainvoke(initial_state)
    return final_state
