from fastapi import FastAPI
from .routers import events, saved_events
from .database import Base, engine
from . import models  # ensures tables are known

def create_app() -> FastAPI:
    app = FastAPI(title="Student Event Aggregator API")

    @app.on_event("startup")
    def on_startup():
        Base.metadata.create_all(bind=engine)

    app.include_router(events.router)
    app.include_router(saved_events.router)
    return app

app = create_app()
