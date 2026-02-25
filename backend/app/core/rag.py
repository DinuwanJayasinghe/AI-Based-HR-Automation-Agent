from typing import List
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from app.core.config import settings
import os

def ingest_document(file_path: str, policy_type: str):
    """Ingests a PDF document into ChromaDB."""
    if not settings.GOOGLE_API_KEY:
        return "Google API Key not configured"

    loader = PyPDFLoader(file_path)
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)

    for chunk in chunks:
        chunk.metadata["policy_type"] = policy_type

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=settings.GOOGLE_API_KEY)

    vectorstore = Chroma(
        collection_name="hr_policies",
        embedding_function=embeddings,
        persist_directory="./chroma_db"
    )
    vectorstore.add_documents(chunks)
    return f"Ingested {len(chunks)} chunks from {file_path}"

def query_policy(question: str, policy_type: str = None, k: int = 5):
    """Queries the ChromaDB for relevant policy chunks."""
    if not settings.GOOGLE_API_KEY:
        return ["Google API Key not configured. Using fallback policy."]

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=settings.GOOGLE_API_KEY)

    if not os.path.exists("./chroma_db"):
        return ["Policy database is empty. Please upload policy documents."]

    vectorstore = Chroma(
        collection_name="hr_policies",
        embedding_function=embeddings,
        persist_directory="./chroma_db"
    )

    filter_dict = {"policy_type": policy_type} if policy_type else {}
    results = vectorstore.similarity_search(question, k=k, filter=filter_dict)

    return [doc.page_content for doc in results]
