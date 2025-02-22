from pydantic import BaseModel, TypeAdapter

class Scholarship(BaseModel):
    scholarship_name: str
    deadline: str
    amount: str
    description: str
    location: str
    years: str
    link: str
    gender: str
    gpa: str
    hbcu: str
    international: str
    major: str
    need_merit: str
    origin_country: str
    race: str
    us_citizen: str
