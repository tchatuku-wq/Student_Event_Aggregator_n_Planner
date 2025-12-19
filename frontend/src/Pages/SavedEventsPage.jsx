import React, { useEffect, useState } from "react";
import { fetchSavedEvents } from "../api/client.js";
import SavedEventsList from "../components/SavedEventsList.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function SavedEventsPage() {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSaved = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchSavedEvents();
      setSavedEvents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load saved events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">My Saved Events</h1>
      <p className="text-sm text-slate-600 mb-4">
        Events you have saved to your personal dashboard.
      </p>
      {error && <ErrorMessage message={error} />}
      {loading ? <Loader /> : <SavedEventsList savedEvents={savedEvents} />}
    </div>
  );
}

export default SavedEventsPage;
