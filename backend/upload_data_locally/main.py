import json
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

app = initialize_app()
firestore_client: google.cloud.firestore.Client = firestore.client()


with open("./new_scholarships.json", "r") as file:
    lines = file.read()
    scholarships = json.loads(lines)


i = 0
for scholarship in scholarships:
    print(i)
    doc_ref = firestore_client.collection("scholarships").add(scholarship)
    i += 1
