from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import crud, schemas

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/", response_model=List[schemas.EventResponse])
def list_events(category: Optional[str] = None,
                search: Optional[str] = None,
                skip: int = 0,
                limit: int = 50,
                db: Session = Depends(get_db)):
    return crud.get_events(db, skip, limit, category, search)

@router.get("/{event_id}", response_model=schemas.EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
