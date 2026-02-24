import cv2
import numpy as np
import base64
from deepface import DeepFace
from typing import Optional, List, Dict
import os

# Set backend for DeepFace if needed
# os.environ['DEEPFACE_BACKEND'] = 'opencv'

def decode_image(image_data: str):
    """Decodes base64 image data to OpenCV format."""
    try:
        if "," in image_data:
            image_data = image_data.split(",")[1]
        img_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print(f"Error decoding image: {e}")
        return None

def liveness_check(img, faces) -> bool:
    """
    Placeholder for liveness detection (anti-spoofing).
    In a real scenario, this would check for eye blinking, texture analysis, etc.
    """
    if len(faces) == 0:
        return False
    # Simplified check: just ensuring a face is detected by OpenCV as well
    return True

def get_face_embedding(img):
    """Generates face embedding using DeepFace."""
    try:
        results = DeepFace.represent(img, model_name="Facenet512", enforce_detection=True)
        if results:
            return results[0]["embedding"]
    except Exception as e:
        print(f"Error generating embedding: {e}")
    return None

def compare_embeddings(embedding1, embedding2, threshold=0.4):
    """Compares two embeddings using cosine distance."""
    # This is usually handled by DeepFace.verify or similar
    # or manual cosine similarity calculation
    pass
