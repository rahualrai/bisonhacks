# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
import ollama
from ollama import ChatResponse

app = initialize_app()


@https_fn.on_request()
def askaboutscholarship(req: https_fn.Request) -> https_fn.Response:
    # Grab the text parameter.
    data = req.form

    # try:
    #     currentLivingCountry = data["currentLivingCountry"]
    #     currentLivingState = data["currentLivingState"]
    #     gender = data["gender"]
    #     gpa = data["gpa"]
    #     grade = data["grade"]
    #     hbcu = data["hbcu"]
    #     international = data["international"]
    #     major = data["major"]
    #     needMerit = data["needMerit"]
    #     originCountry = data["originCountry"]
    #     major = data["major"]
    #     race = data["race"]
    #     uid = data["uid"]
    #     usCitizen = data["usCitizen"]
    #     conversation = data["conversation"]
    # except:
    #     return https_fn.Response("Bad Request", status=400)

    conversation = [{"role": "user", "content": "Placeholder history"}]

    # TODO: update system prompt and include the scholarship info
    system_prompt = {"role": "system", "content": "Placeholder Prompt"}
    chat_history = [system_prompt]
    chat_history.extend(conversation)
    # TODO: Remove this line after you get message history
    chat_history.append({"role": "user", "content": "Why is the sky blue?"})

    response: ChatResponse = ollama.chat(
        model="llama3.2:3b",
        messages=chat_history,
    )

    # Send back a message that we've successfully written the message
    return https_fn.Response(f"Response: {response.message.content}")


@firestore_fn.on_document_created(document="messages/{pushId}")
def resumehelp(
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
