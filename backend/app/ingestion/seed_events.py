import json
from pathlib import Path
from datetime import datetime

from app.database import SessionLocal
from app.models import Event
from app.database import engine



DATA_PATH = Path(__file__).resolve().parents[2] / "data" / "events.json"

def seed_events():
    db = SessionLocal()
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            events = json.load(f)

        for item in events:
            event = Event(
                title=item["title"],
                description=item.get("description"),
                start_time=datetime.fromisoformat(item["start_time"]),
                end_time=datetime.fromisoformat(item["end_time"])
                if item.get("end_time")
                else None,
                location=item.get("location"),
                category=item.get("category"),
                source=item.get("source"),
                url=item.get("url"),
            )
            db.add(event)

        db.commit()
        print(f"Seeded {len(events)} events successfully.")

    finally:
        db.close()
print("SEED DB URL:", engine.url)

if __name__ == "__main__":
    seed_events()
