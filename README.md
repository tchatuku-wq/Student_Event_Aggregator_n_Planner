# Web-based Student Event Aggregator & Planner

A full-stack web application that helps university students discover, filter, view, and save campus/community events from multiple sources.

**Author:** Tafirenyika Bonfrey Chatukuta  
**Course:** (Your course name here)  
**Semester:** (Your semester here)  
**Project Type:** Individual Project

---

## Project Overview

University event information is often scattered across emails, flyers, student organization pages, and public calendars. This project builds a single platform that aggregates events and provides a clean browsing experience with filtering, event details, and a personal saved-events dashboard.

To ensure fast development when scraping is time-consuming, the system supports seeding dummy event data (LLM-generated JSON) into the database.

---

## Features (Current)

### Backend (FastAPI + PostgreSQL)
- Browse all events: `GET /events/`
- Filter by category: `GET /events/?category=Tech`
- Search by title: `GET /events/?search=Hackathon`
- Event details by ID: `GET /events/{id}`
- Save events for a user: `POST /users/{user_id}/saved-events`
- List saved events: `GET /users/{user_id}/saved-events`

### Testing
- PyTest tests for core endpoints
- SQLite test database for fast, isolated tests

### Data ingestion
- Seed script imports dummy data from `backend/data/events.json`

---

## Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- PostgreSQL (psycopg2)
- python-dotenv

**Testing**
- PyTest
- httpx

**Frontend**
- React + Vite
- TailwindCSS
- Axios
- React Router

---

## Project Structure

```text
web_based_student_event_aggregator_n_planner/
  backend/
    app/
      core/
      routers/
      ingestion/
      main.py
      database.py
      models.py
      schemas.py
      crud.py
      init_db.py
    data/
      events.json
    tests/
      conftest.py
      test_events.py
      test_saved_events.py
    requirements.txt
    .env
  frontend/
    src/
    package.json
```
________________________________________

# Setup & Run (Windows / PowerShell)
1) Backend setup**
Open PowerShell and go to the backend folder:
cd "C:\Users\bonfr\PycharmProjects\web_based_student_event_aggregator_n_planner\backend"
Activate the virtual environment:
.\.venv\Scripts\activate
Install dependencies:
pip install -r requirements.txt
2) Configure database
Create a PostgreSQL database named student_event (via pgAdmin is easiest).
Set your connection in backend/.env:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/student_event
If your password contains special characters like @ : / ? & =, URL-encode it or store it in separate env vars.
3) Create tables
python -m app.init_db
4) Seed events
python -m app.ingestion.seed_events
5) Run the backend server
python -m uvicorn app.main:app --reload
Open Swagger docs:
•	http://127.0.0.1:8000/docs
________________________________________
# Running Tests
From the backend folder:
python -m pytest -q
Expected output looks like:
7 passed, ... warnings in ...s
________________________________________
## Frontend (Optional Demo)
In a separate terminal:
cd "C:\Users\bonfr\PycharmProjects\web_based_student_event_aggregator_n_planner\frontend"
npm install
npm run dev
Open:
•	http://localhost:5173
If the frontend cannot call the backend due to CORS, add CORS middleware in FastAPI.
________________________________________
## Troubleshooting
ModuleNotFoundError: No module named 'app'
You are not running from the backend/ folder. Fix:
cd backend
python -m uvicorn app.main:app --reload
FATAL: database ... does not exist
Create the database in pgAdmin, or update .env to the correct database name.
/events returns []
This means the events table has no rows. Run:
python -m app.ingestion.seed_events
________________________________________
### Next Steps (Planned)
•	Add real ingestion from university calendar sources (scraping/APIs)
•	Add date-range filtering and reminders
•	Improve frontend UX and add authentication
•	Deployment (Render/Railway/Vercel) with CI/CD (GitHub Actions)
________________________________________
### License
For academic use.
