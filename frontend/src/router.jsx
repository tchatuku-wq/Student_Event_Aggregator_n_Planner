import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SavedEventsPage from "./pages/SavedEventsPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/saved" element={<SavedEventsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
    </Routes>
  );
}

export default AppRouter;
