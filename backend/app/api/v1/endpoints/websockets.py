from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from app.core.websocket_manager import manager
from app.core.config import settings
from jose import jwt, JWTError

router = APIRouter()

@router.websocket("/ws/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    # Simple token validation
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = str(payload.get("sub"))
    except JWTError:
        await websocket.close(code=4001)
        return

    await manager.connect(user_id, websocket)
    try:
        while True:
            # Just keep the connection alive, we primarily send data TO the client
            data = await websocket.receive_text()
            # Echo or handle incoming client messages if needed
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)
