# Canvas BisonHacks Project
This project is a full-stack application built with a Firebase-backed Python server and a React-based frontend. It processes scholarship data, provides AI-powered services, and enables users to interact via chat.

## Project Structure

### `backend/`
Contains the Firebase configuration and Python code for:
- Cloud functions (see `backend/functions/main.py`) for handling AI help and scholarship queries.
- Data upload scripts (see `backend/upload_data_locally/main.py`) for ingesting scholarship data into Firestore.

### `frontend/`
Contains a React application which includes:
- The main UI components (e.g. `ChatBot.js` and `frontend/src/components/Welcome.js`).
- Firebase authentication and Firestore integration (see `frontend/src/firebase.js`).

### `data/`
Includes scripts for data conversion and importing, such as converting CSV to JSON and related files.

### `schemas/`
Defines data models used in the project (e.g. `schemas/scholarships.py`).

## Installation

### Backend
Navigate to the backend folder.

```sh
cd backend
```

Create a virtual environment:

```sh
python -m venv venv
```

Activate your virtual environment and install dependencies:

```sh
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

Set up your environment variables (e.g. for `GEMINI_API_KEY`).

### Frontend
Navigate to the frontend folder.

```sh
cd frontend
```

Install the dependencies using npm (or your preferred package manager):

```sh
npm install
```

## Running the Application

### Backend Functions
To test the Firebase functions locally, use the Firebase CLI:

```sh
firebase emulators:start --only functions
```

Alternatively, deploy functions with:

```sh
firebase deploy --only functions
```

### Data Upload
Run the data upload script from:

```sh
python backend/upload_data_locally/main.py
```

This script loads new scholarship data, generates embeddings, and adds documents to the Firestore database.

### Frontend
To start the React development server, run:

```sh
npm start
```

## Features
- **AI-Powered Chat**: Uses Gemini API to provide smart responses (see `main.py` and `frontend/src/components/ChatBot.js`).
- **Scholarship Data Management**: Upload and process scholarship data using Python scripts.
- **User Profiles**: Store and manage user profiles and resumes (see `backend/upload_data_locally/userProfile.py`).
- **Firebase Integration**: Authentication, Firestore, and Cloud Functions are used throughout the project.

## Deployment

### Backend
Deploy via Firebase CLI to your configured Firebase project:

```sh
firebase deploy
```

### Frontend
Build the production version with:

```sh
npm run build
```

and serve it using your preferred static file server.
