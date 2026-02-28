# Database Import Guide

This directory contains the necessary files to set up the databases for the AI HR Manager system.

## 1. PostgreSQL (Relational Data)

**File:** `postgres_schema.sql`

### Using pgAdmin 4:
1. Open pgAdmin 4 and connect to your server.
2. Create a new database named `hr_manager`.
3. Right-click on the `hr_manager` database and select **Query Tool**.
4. Click the **Open File** icon and select `postgres_schema.sql`.
5. Press **F5** or the **Execute** button to run the script.
6. This will create all tables and insert the initial seed data (including the admin user).

---

## 2. MongoDB (Unstructured Logs & History)

**File:** `mongo_data.json`

### Using MongoDB Compass:
1. Open MongoDB Compass and connect to your instance.
2. Create a new database named `hr_manager`.
3. Create the following collections: `chat_history`, `system_logs`, `notifications`.
4. For each collection, click **Add Data** -> **Import JSON or CSV file**.
5. Note: The provided `mongo_data.json` contains sample data for all three. You may need to split the JSON into separate files for each collection or import them manually.

### Using mongoimport (Command Line):
```bash
# Import chat history
mongoimport --db hr_manager --collection chat_history --file chat_history.json --jsonArray
```

---

## 3. ChromaDB (Vector Embeddings)

ChromaDB is automatically initialized and persisted in the `./chroma_db` directory of the project. To populate it with HR policies:
1. Log in as an Administrator.
2. Navigate to the **RAG Management** section (or use the AI Agent).
3. Upload your PDF policy documents.
4. The system will automatically chunk, embed, and store them in ChromaDB.

---

## 4. Redis (Caching & Real-time)

Redis does not require a persistent schema. It will be initialized at runtime by the FastAPI backend and the Notification microservice to handle WebSocket broadcasts and notification queues.
