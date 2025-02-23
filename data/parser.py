import csv
import time
import json
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field
from typing import Literal
from google import genai

# Define the Scholarship model.
class Scholarship(BaseModel):
    scholarship_name: str = Field(..., description="Name of the scholarship")
    deadline: str = Field(..., description="Application deadline (YYYY-MM-DD)")
    amount: Decimal = Field(..., description="Award amount (monetary value)")
    description: str = Field(..., description="Details and eligibility requirements")
    link: str = Field(..., description="URL for more information or application")
    location: str = Field(..., description="Location of the scholarship provider")
    classification: Literal["Freshman", "Sophomore", "Junior", "Senior", "Any"] = Field(..., description="Eligible academic year")
    gender: Literal['Male', 'Female', 'Any'] = Field("Any", description="Eligible gender")
    gpa: float = Field(0.0, description="Minimum GPA required")
    hbcu: bool = Field(False, description="Eligibility for HBCU students")
    international: bool = Field(False, description="Eligibility for international students")
    major: str = Field("", description="Eligible major")
    merit_based_aid: bool = Field(False, description="Merit-based aid available")
    need_based_aid: bool = Field(False, description="Need-based aid available")
    origin_country: str = Field("", description="Required origin country, if applicable")
    race: str = Field("", description="Preferred race/ethnicity")
    us_citizen: bool = Field(False, description="Requirement for U.S. citizenship")

# Manually defined JSON schema for a list of Scholarship objects.
scholarship_list_schema = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "scholarship_name": {
                "type": "string",
                "description": "Name of the scholarship"
            },
            "deadline": {
                "type": "string",
                "description": "Application deadline (YYYY-MM-DD)"
            },
            "amount": {
                "type": "string",
                "description": "Award amount (monetary value)"
            },
            "description": {
                "type": "string",
                "description": "Details and eligibility requirements"
            },
            "link": {
                "type": "string",
                "description": "URL for more information or application"
            },
            "location": {
                "type": "string",
                "description": "Location of the scholarship provider"
            },
            "classification": {
                "type": "string",
                "enum": ["Freshman", "Sophomore", "Junior", "Senior", "Any"],
                "description": "Eligible academic year"
            },
            "gender": {
                "type": "string",
                "enum": ["Male", "Female", "Any"],
                "description": "Eligible gender"
            },
            "gpa": {
                "type": "number",
                "description": "Minimum GPA required"
            },
            "hbcu": {
                "type": "boolean",
                "description": "Eligibility for HBCU students"
            },
            "international": {
                "type": "boolean",
                "description": "Eligibility for international students"
            },
            "major": {
                "type": "string",
                "description": "Eligible major"
            },
            "merit_based_aid": {
                "type": "boolean",
                "description": "Merit-based aid available"
            },
            "need_based_aid": {
                "type": "boolean",
                "description": "Need-based aid available"
            },
            "origin_country": {
                "type": "string",
                "description": "Required origin country, if applicable"
            },
            "race": {
                "type": "string",
                "description": "Preferred race/ethnicity"
            },
            "us_citizen": {
                "type": "boolean",
                "description": "Requirement for U.S. citizenship"
            }
        },
        "required": [
            "scholarship_name", "deadline", "amount", "description", "link",
            "location", "classification", "gender", "gpa", "hbcu", "international",
            "major", "merit_based_aid", "need_based_aid", "origin_country", "race",
            "us_citizen"
        ]
    }
}

# For a single scholarship object, use the schema defined in the "items" key.
scholarship_object_schema = scholarship_list_schema["items"]

# Initialize the GenAI client.
GEMINI_API_KEY = "AIzaSyAgfjJKR8m_dXSdJGjzymkNBNOSAh6HkhE"
client = genai.Client(api_key=GEMINI_API_KEY)

# Read the CSV file and store header separately.
with open('scholarships.csv', 'r', encoding='utf-8') as csv_file:
    reader = csv.DictReader(csv_file)
    rows = list(reader)
    header = ",".join(reader.fieldnames)

# Prepare a list to store the processed scholarship objects.
new_scholarships = []

# Process each row starting from the 90th row.
total_rows = len(rows)
for idx, row in enumerate(rows[99:], start=99):
    # Build a CSV snippet including the header and the current row.
    row_data = ",".join([row[field] for field in reader.fieldnames])
    csv_snippet = f"{header}\n{row_data}"
    
    # Build the prompt for the current row.
    prompt_contents = f"""
Parse the following CSV data into a JSON object of Scholarship:
CSV:
{csv_snippet}

Notes:
- For the 'Deadline' field, convert dates like "February 28" into a YYYY-MM-DD format assuming the current year.
- Remove commas from the 'Amount' field and convert it into a Decimal string.
- Map the 'Years' field to the 'classification' field by choosing the first listed value (e.g., "College junior" becomes "Junior").
- For fields not provided in the CSV, use the default values specified in the Scholarship model or a null value.
    """
    
    # Call the GenAI API for the current row.
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt_contents,
        config={
            'response_mime_type': 'application/json',
            'response_schema': scholarship_object_schema,
        },
    )
    
    # Get the parsed JSON object for this row.
    scholarship_obj = response.parsed
    new_scholarships.append(scholarship_obj)
    
    # Write the cumulative results to the output JSON file.
    with open('new_scholarships.json', 'w', encoding='utf-8') as json_file:
        json.dump(new_scholarships, json_file, indent=4)
    
    # Print progress and wait 3 seconds before processing the next row.
    print(f"Processed row {idx} of {total_rows}")
    time.sleep(3)

print("All rows have been processed and written to new_scholarships.json")
