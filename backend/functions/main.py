# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
from google import genai
import google.cloud.firestore
import ollama
from ollama import ChatResponse
import json
from dotenv import load_dotenv
import os
from firebase_functions.params import IntParam, StringParam

load_dotenv()
GEMINI_API_KEY = StringParam("GEMINI_API_KEY")
# Generation configuration
generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 2048,
}
gemini_client = genai.Client(api_key=GEMINI_API_KEY.value)
app = initialize_app()
firestore_client: google.cloud.firestore.Client = firestore.client()


@https_fn.on_request()
def askaboutscholarship(req: https_fn.Request) -> https_fn.Response:
    # Grab the text parameter.
    data = req.form

    try:
        uid = data["uid"]
        conversation = data["conversation"]
    except:
        return https_fn.Response("Bad Request", status=400)

    # TODO: Remove UID after we provide real uid
    uid = "DayzkNMrtmqsjO5Wb8zV"
    doc_ref = firestore_client.collection("userProfiles").document(uid)

    doc = doc_ref.get()
    # TODO: Use profile in chat history
    profile = doc.to_dict()
    print(profile)

    conversation = [{"role": "user", "content": "Placeholder history"}]

    # TODO: update system prompt and include the scholarship info
    system_prompt = {"role": "system", "content": "Placeholder Prompt"}
    chat_history = [system_prompt]
    chat_history.extend(conversation)
    # TODO: Remove this line after you get message history
    chat_history.append({"role": "user", "content": "Why is the sky blue?"})

    response = gemini_client.models.generate_content(
        model="gemini-2.0-flash", contents="Why is the sky blue?"
    )
    api_response = {"response": response.text}

    # Send back a message that we've successfully written the message
    return https_fn.Response(json.dumps(api_response))


@firestore_fn.on_document_created(document="messages/{pushId}")
def aiapply(
    event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None],
) -> None:
    """Listens for new documents to be added to /messages. If the document has
    an "original" field, creates an "uppercase" field containg the contents of
    "original" in upper case."""

    # Get the value of "original" if it exists.
    if event.data is None:
        return
    try:
        original = event.data.get("original")
    except KeyError:
        # No "original" field, so do nothing.
        return

    # Set the "uppercase" field.
    print(f"Uppercasing {event.params['pushId']}: {original}")
    upper = original.upper()
    event.data.reference.update({"uppercase": upper})
