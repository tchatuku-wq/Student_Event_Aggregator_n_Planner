
from sqlalchemy.orm import Session

from . import models

from . import schemas



def get_events(db: Session, skip=0, limit=50, category=None, search=None):
    query = db.query(models.Event)
    if category:
        query = query.filter(models.Event.category == category)
    if search:
        search_like = f"%{search}%"
        query = query.filter(models.Event.title.ilike(search_like))
    return query.offset(skip).limit(limit).all()

def get_event(db: Session, event_id: int):
    return (
        db.query(models.Event)
        .filter(models.Event.id == event_id)
        .first()
    )



def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def save_event_for_user(db: Session, user_id: int, event_id: int):
    saved = models.SavedEvent(user_id=user_id, event_id=event_id)
    db.add(saved)
    db.commit()
    db.refresh(saved)
    return saved

from sqlalchemy.orm import joinedload

def get_saved_events_for_user(db: Session, user_id: int):
    return (
        db.query(models.SavedEvent)
        .options(joinedload(models.SavedEvent.event))
        .filter(models.SavedEvent.user_id == user_id)
        .all()
    )

