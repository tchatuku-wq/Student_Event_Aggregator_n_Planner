from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/users", tags=["Saved Events"])

@router.get("/{user_id}/saved-events", response_model=List[schemas.SavedEventResponse])
def list_saved_events(user_id: int, db: Session = Depends(get_db)):
    return crud.get_saved_events_for_user(db, user_id)

@router.post("/{user_id}/saved-events", response_model=schemas.SavedEventResponse)
def save_event(user_id: int, payload: schemas.SavedEventCreate, db: Session = Depends(get_db)):
    return crud.save_event_for_user(db, user_id, payload.event_id)
