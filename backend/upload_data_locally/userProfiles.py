import json
from firebase_admin import initialize_app, firestore
import google.cloud.firestore
from dotenv import load_dotenv
from google import genai
from google.cloud.firestore_v1.vector import Vector

import os

app = initialize_app()
firestore_client: google.cloud.firestore.Client = firestore.client()


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
uid = "4auyMYAj7QSYuLlLRppHtGvSkoj1"

resume_text = """
Education
Howard University | Aug 2022 - May 2026
B.S in Computer Science, GPA: 4.0/4.0 | Washington, DC
Coursework: Software Engineering, Operating Systems, Fundamentals of Algorithms, Cloud Computing, Theory of Computation, Data Structures, Computer Organization, Discrete Structures, Calculus II, Computer Networks
Awards: Dean’s List, Google Capacity Scholar, DOW SURE Scholar, HU Founders Scholarship
Technical Skills
Languages: Python, HTML/CSS, JavaScript, MATLAB, C/C++
Technologies & Frameworks: React, Next.js, Flask, Azure, AWS, OpenCV, Git/GitHub, Figma, JIRA, Confluence
Certifications: Career Essentials in Generative AI by Microsoft and LinkedIn, Python Intermediate, Cybersecurity Intermediate, iOS Development, Intro to Software Engineering
Work Experience
Software Engineering Intern | Dell Technologies | Hopkinton, MA | May 2024 – Aug 2024
Led development of a Python-based command-line tool that automated diagnostic log data analysis, reducing manual analysis time by 50% through advanced parsing and visualization techniques.
Enhanced the tool’s efficiency and reliability by 25% through close collaboration with engineering and product management teams, aligning solutions with real-time business goals.
Research Assistant | Howard University | Washington, DC | May 2023 – May 2024
Investigated bacterial volumes and shear rates for stable Staphylococcus aureus biofilm formation.
Enhanced biofilm modeling by integrating BioFlux data with COMSOL simulations in MATLAB.
Applied Multiple Linear & Polynomial Regression to refine correlations between shear stress & bacterial adhesion.
STEAM Intern | Tech TurnUp | Washington, DC | Jul 2023 – Aug 2023
Led hands-on workshops and mentored 100+ students in 3D modeling using Tinkercad and Python.
Designed interactive AR/VR course materials via CoSpaces.io, resulting in a 25% increase in student involvement and productivity, providing campers with immersive educational experiences.
Projects
TradeSim: Demo Crypto Trading Simulator | Personal Project | Nov 2024
Developed TradeSim, a Chrome Extension using JavaScript, HTML/CSS, and Chrome Extensions API to simulate cryptocurrency trading with virtual funds, profit/loss tracking, and exportable trade history.
        """
result = client.models.embed_content(model="text-embedding-004", contents=resume_text)

# print(result.embeddings[0].values)

upload = {
    "classification": "Junior",
    "current_living_country": "US",
    "current_living_state": "DC",
    "gender": "Male",
    "gpa": 4.0,
    "hbcu": True,
    "major": "Computer Science",
    "need_based_aid": True,
    "origin_country": "Nepal",
    "race": "Asian",
    "resume_embeddings": Vector(result.embeddings[0].values),
    "resume": resume_text,
    "uid": uid,
    "us_citizen": False,
}


doc_ref = firestore_client.collection("userProfiles").document(uid)
doc_ref.set(upload)
