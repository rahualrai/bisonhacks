# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
from google import genai
import google.cloud.firestore
from google.cloud.firestore_v1 import vector_query
from google.cloud.firestore_v1.base_vector_query import DistanceMeasure
from google.genai.chats import Content, Part
import ollama
from ollama import ChatResponse
import json
from dotenv import load_dotenv
import os
from firebase_functions.params import IntParam, StringParam
from firebase_admin import credentials


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
def aihelp(req: https_fn.Request) -> https_fn.Response:
    # Grab the text parameter.
    data = req.form

    try:
        uid = data["uid"]
        scholarship_id = data["scholarship_id"]
        conversations = json.loads(str(data["conversations"]))
    except:
        return https_fn.Response("Bad Request", status=400)

    # resume
    doc_ref = firestore_client.collection("userProfiles").document(uid)
    doc = doc_ref.get()
    profile = doc.to_dict()
    del profile["resume_embeddings"]
    del profile["uid"]
    profile_string = ""
    for profile_key, profile_value in zip(profile.keys(), profile.values()):
        profile_string += f"{profile_key}: {profile_value}\n"

    # scholarship
    scholarship_ref = firestore_client.collection("scholarships").document(
        scholarship_id
    )
    scholarship_doc = scholarship_ref.get()
    scholarship = scholarship_doc.to_dict()

    scholarship_string = ""
    del scholarship["description_embeddings"]
    for scholarship_key, scholarship_value in zip(
        scholarship.keys(), scholarship.values()
    ):
        scholarship_string += f"{scholarship_key}: {scholarship_value}\n"

    # TODO: update system prompt and include the scholarship info
    system_prompt = f"""
You are an expert scholarship application assistant. Your goal is to guide and support users in crafting compelling scholarship applications based on their provided user profile and scholarship information.

**Your Role:**

1.  **Understand the Context:**
    * **User Profile:** You will receive a user profile containing information about the user's academic achievements, extracurricular activities, skills, experiences, and personal background. \n {profile_string} \n
    * **Scholarship Information:** You will receive scholarship information, including eligibility criteria, essay prompts, required documents, and deadlines. {scholarship_string} \n
2.  **Analyze and Strategize:**
    * Carefully analyze the user's profile and the scholarship requirements to identify key connections and strengths.
    * Determine how the user's experiences and skills align with the scholarship's goals and values.
3.  **Essay Assistance:**
    * Help the user brainstorm ideas for their essays based on their profile and the essay prompts.
    * Provide guidance on structuring essays, developing compelling arguments, and showcasing the user's unique qualities.
    * Offer suggestions for improving the clarity, conciseness, and impact of the user's writing.
    * Generate essay drafts based on the user profile and scholarship requirements, which the user can then edit and refine.
4.  **Resume Creation:**
    * Create tailored resumes that highlight the user's relevant skills and experiences for the specific scholarship.
    * Organize the resume information in a clear and professional format.
    * Emphasize achievements and experiences that align with the scholarship's criteria.
5.  **Application Guidance:**
    * Provide clear instructions on how to complete the application form and submit required documents.
    * Offer tips for maximizing the user's chances of success.
    * Remind the user of upcoming deadlines.
6.  **Maintain a Conversational Tone:**
    * Engage with the user in a friendly and supportive manner.
    * Ask clarifying questions to ensure you understand their needs and preferences.
    * Provide personalized feedback and suggestions.
7.  **Ethical Considerations:**
    * Never fabricate information or misrepresent the user's qualifications.
    * Ensure all generated content is based on the provided user profile.
    * Clearly state that you are an AI assistant and that the user is responsible for the final application submission.

**Instructions for Interaction:**

1.  **User Input:** The user will provide their profile and the scholarship information.
2.  **Your Response:**
    * Begin by acknowledging the user's input and summarizing the scholarship requirements.
    * Ask clarifying questions as needed.
    * Provide step-by-step guidance on the application process.
    * Generate essay drafts and resume drafts as requested.
    * Offer specific and actionable feedback.

**Example Interaction Flow:**

* **User:** "Here is my profile and the scholarship information for the [Scholarship Name]."
* **You:** "Thank you! I've reviewed your profile and the [Scholarship Name] information. It looks like they're looking for students with strong [key criteria]. I see you have experience in [relevant experience]. To start, let's brainstorm some ideas for the first essay prompt: [essay prompt]. What aspects of your experience do you think best address this prompt?"

By following these guidelines, you will be able to effectively assist users in crafting successful scholarship applications.
"""
    final_message = conversations.pop()["content"]

    history = []
    for part in conversations:
        history.append(Content(parts=[Part(text=part["content"])], role=part["role"]))

    chat = gemini_client.chats.create(
        model="gemini-2.0-flash", config={"system_instruction": system_prompt}
    )
    response = chat.send_message(final_message)
    api_response = {"response": response.text}

    # Send back a message that we've successfully written the message
    return https_fn.Response(json.dumps(api_response), mimetype="application/json")


@https_fn.on_request()
def getscholarships(req: https_fn.Request) -> https_fn.Response:
    # Grab the text parameter.
    data = req.form

    # get the data from the form
    # user_id
    try:
        uid = data["uid"]
    except:
        return https_fn.Response("Bad Request", status=400)
    # get user profile
    doc_ref = firestore_client.collection("userProfiles").document(uid)
    doc = doc_ref.get()
    profile = doc.to_dict()

    # create the filter criterias for the scholarships
    scholarship_ref = firestore_client.collection("scholarships")

    query = (
        scholarship_ref.where(
            filter=google.cloud.firestore.FieldFilter(
                "classification", "in", ["Any", "Junior"]
            ),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter("gender", "!=", "Female"),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter("gpa", "<=", 4),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter(
                "major", "in", ["Any", "Computer Science"]
            ),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter("need_based_aid", "==", True),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter(
                "origin_country", "in", ["Any", "Nepal"]
            ),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter("race", "in", ["Any", "Asian"]),
        )
        .where(
            filter=google.cloud.firestore.FieldFilter("us_citizen", "==", False),
        )
    )

    vector_query = query.find_nearest(
        vector_field="description_embeddings",
        query_vector=profile["resume_embeddings"],
        distance_measure=DistanceMeasure.COSINE,
        limit=20,
    )

    docs = vector_query.stream()

    response = []
    for doc in docs:
        doc_dict = doc.to_dict()
        del doc_dict["description_embeddings"]
        del doc_dict["international"]
        response.append(doc_dict)
        doc_dict["scholarship_id"] = doc.id

    # do a vector similarity serch top 20 from the  scholarships
    api_response = {"scholarships": response}

    return https_fn.Response(json.dumps(api_response), mimetype="application/json")
