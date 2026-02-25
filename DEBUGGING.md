# Debugging the AI-Powered HR Manager

This guide explains how to debug the various components of the HR Manager system.

## 1. Backend (FastAPI)

### Local Debugging
If you want to run the backend outside of Docker for easier debugging:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
# Set environment variables in .env
uvicorn app.main:app --reload --port 8000
```
- **Swagger UI:** Accessible at `http://localhost:8000/docs` for testing API endpoints.
- **Logs:** Uvicorn logs will show incoming requests and errors.

### Docker Logs
To see logs from the running container:
```bash
docker logs -f hr_backend
```

---

## 2. Frontend (React)

- **Browser Console:** Open Chrome DevTools (F12) to see errors and network requests.
- **Redux DevTools:** Use the Redux DevTools extension to inspect state changes in `authSlice` and others.
- **Network Tab:** Verify that WebSocket connections (`ws://...`) are established and that API requests to `/api/v1/...` are returning correct data.

---

## 3. Mobile (React Native)

- **Expo Dev Menu:** Press `d` in the terminal where Expo is running or shake the device.
- **React Navigation DevTools:** Useful for debugging screen transitions.
- **Console Logs:** Logs from `console.log()` will appear in the terminal where you ran `npm start`.

---

## 4. Databases

### PostgreSQL
Inspect the relational data:
```bash
docker exec -it hr_postgres psql -U hr_user -d hr_manager
# List tables: \dt
# Query: SELECT * FROM employees;
```

### MongoDB
Inspect logs and audit trails:
```bash
docker exec -it hr_mongodb mongosh
# use hr_manager
# db.notifications.find().pretty()
```

### Redis
Check real-time notification queues:
```bash
docker exec -it hr_redis redis-cli
# MONITOR  (to see real-time commands)
# PUBLISH notifications "test message"
```

---

## 5. AI & Workflows (LangGraph / RAG)

- **LangSmith (Optional):** If you have a LangSmith API key, set `LANGCHAIN_TRACING_V2=true` in `.env` to visualize the LangGraph steps and LLM inputs/outputs.
- **ChromaDB:** To verify if documents are ingested:
  - Check the `./backend/chroma_db` directory for persistence files.
  - Use the `query_policy` function in a standalone script to test retrieval.

---

## 6. Real-time Features (WebSockets)

- **WebSocket Test Tool:** Use a browser extension like "Simple WebSocket Client" to connect to `ws://localhost:8000/api/v1/ws/{YOUR_JWT_TOKEN}`.
- **Heartbeat:** The system expects a persistent connection. Check the "Network -> WS" tab in Chrome DevTools to see frames being sent and received.

---

## 7. Face Recognition

- **Local Testing:** You can run `backend/app/core/face_recognition.py` as a script with a sample image to see if embeddings are generated correctly.
- **DeepFace Backend:** If face detection is slow, try changing the `detector_backend` in the code (e.g., to `opencv` or `retinaface`).
