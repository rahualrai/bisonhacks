from pydantic import BaseModel, TypeAdapter

class Scholarship(BaseModel):
    scholarship_name: str = Field(..., description="Name of the scholarship")
    deadline: date = Field(..., description="Application deadline (YYYY-MM-DD)")
    amount: Decimal = Field(..., description="Award amount (monetary value)")
    description: str = Field(..., description="Details and eligibility requirements")
    link: HttpUrl = Field(..., description="URL for more information or application")
    location: str = Field(..., description="Location of the scholarship provider")
    classification: Literal["Freshman", "Sophomore", "Junior", "Senior",'Any'] = Field(..., description="Eligible academic year (e.g., freshman, sophomore)")
    gender: Literal['Male', 'Female', 'Any'] = Field(..., description="Eligible gender")
    gpa: float = Field(..., description="Minimum GPA required")
    hbcu: bool = Field(..., description="Eligibility for HBCU students (True/False)")
    international: bool = Field(..., description="Eligibility for international students (True/False)")
    major: str = Field(..., description="Eligible major")
    merit_based_aid: bool
    need_based_aid: bool
    origin_country: str = Field(..., description="Required origin country, if applicable")
    race: str = Field(..., description="Eligible race/ethnicity")
    us_citizen: bool = Field(..., description="Requirement for U.S. citizenship (True/False)")