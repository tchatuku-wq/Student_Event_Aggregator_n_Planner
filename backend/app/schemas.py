from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class EventBase(BaseModel):
    title: str
    description: Optional[str]
    start_time: datetime
    end_time: Optional[datetime]
    location: Optional[str]
    category: Optional[str]
    source: Optional[str]
    url: Optional[str]

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    name: Optional[str]

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    class Config:
        orm_mode = True


class SavedEventCreate(BaseModel):
    user_id: int
    event_id: int

class SavedEventResponse(SavedEventCreate):
    id: int
    event: EventResponse
    class Config:
        orm_mode = True
