from dataclasses import dataclass
from typing import List


@dataclass
class Request:
    uid: str


@dataclass
class ScholarshipInfo:
    scholarship_id: str
    name: str
    deadline: str
    amount: float
    description: str


@dataclass
class Response:
    scholarships: List[ScholarshipInfo]
