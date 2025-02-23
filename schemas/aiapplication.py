from dataclasses import dataclass
from typing import List


@dataclass
class message:
    role: str  ## Always will be 'user', 'model' or 'system'
    content: str  ## content


@dataclass
class Request:
    uid: str
    conversation: List[message]  ## THIS MUST BE A JSON PAR


@dataclass
class Response:
    response: str
