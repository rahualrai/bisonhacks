import json
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from dotenv import load_dotenv
from google import genai
import os
from google.cloud.firestore_v1.vector import Vector

app = initialize_app()
firestore_client: google.cloud.firestore.Client = firestore.client()

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)


with open("./new_scholarships.json", "r") as file:
    lines = file.read()
    scholarships = json.loads(lines)


i = 0
for scholarship in scholarships:
    print(i)
    desc = (
        scholarship["description"] if len(scholarship["description"]) != 0 else "empty"
    )
    result = client.models.embed_content(model="text-embedding-004", contents=desc)
    scholarship["description_embeddings"] = Vector(result.embeddings[0].values)

    doc_ref = firestore_client.collection("scholarships").add(scholarship)
    i += 1
