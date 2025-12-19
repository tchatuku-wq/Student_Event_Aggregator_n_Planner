from datetime import datetime


import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import create_app
from app import models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # simple local test db file

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session", autouse=True)
def create_test_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture()
def db():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture()
def client(db):
    app = create_app()

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    return TestClient(app)

@pytest.fixture()
def seed_data(db):
    # Create user
    user = models.User(email="test@example.com", name="Test User")
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create events
    e1 = models.Event(
        title="Test Event 1",
        description="Desc",
        start_time=datetime(2025, 3, 12, 18, 0, 0),
        end_time=None,
        location="Room A",
        category="Tech",
        source="Unit Test",
        url="https://example.com/1",
    )

    e2 = models.Event(
        title="Career Night",
        description="Desc",
        start_time=datetime(2025, 3, 16, 17, 0, 0),
        end_time=None,
        location="Hall",
        category="Career",
        source="Unit Test",
        url="https://example.com/2",
    )

    db.add_all([e1, e2])
    db.commit()
    db.refresh(e1)
    db.refresh(e2)

    return {"user": user, "events": [e1, e2]}
@pytest.fixture()
def db():
    session = TestingSessionLocal()

    # Clean tables before each test to avoid UNIQUE constraint issues
    session.query(models.SavedEvent).delete()
    session.query(models.User).delete()
    session.query(models.Event).delete()
    session.commit()

    try:
        yield session
    finally:
        session.close()
