from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime)
    location = Column(String(255))
    category = Column(String(100))
    source = Column(String(255))
    url = Column(String(500))

    saved_by_users = relationship("SavedEvent", back_populates="event")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    name = Column(String(255))

    saved_events = relationship("SavedEvent", back_populates="user")


class SavedEvent(Base):
    __tablename__ = "saved_events"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))

    user = relationship("User", back_populates="saved_events")
    event = relationship("Event", back_populates="saved_by_users")
