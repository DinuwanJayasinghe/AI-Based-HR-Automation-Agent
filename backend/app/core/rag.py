import chromadb
from chromadb.config import Settings as ChromaSettings
from app.core.config import settings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def get_vectorstore():
    client = chromadb.HttpClient(host=settings.CHROMADB_HOST, port=settings.CHROMADB_PORT)
    return client

def query_policy(question: str, policy_type: str = None, k: int = 3):
    # Placeholder for RAG retrieval logic
    # In a real app, we'd use LangChain's Chroma wrapper
    return [
        "Annual leave is 14 days per year.",
        "Sick leave requires a medical certificate for more than 2 days."
    ]
