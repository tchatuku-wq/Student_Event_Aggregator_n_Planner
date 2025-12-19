import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEventById, saveEvent, fetchSavedEvents } from "../api/client.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleString();
}

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEventById(id);
      setEvent(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  const loadSaved = async () => {
    try {
      const data = await fetchSavedEvents();
      const ids = data.map((se) => (se.event ? se.event.id : se.event_id));
      setSavedIds(ids);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEvent();
    loadSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSave = async () => {
    if (!event) return;
    try {
      setSaving(true);
      await saveEvent(event.id);
      await loadSaved();
    } catch (err) {
      console.error(err);
      setError("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const isSaved = event && savedIds.includes(event.id);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <p className="text-sm text-slate-500">Event not found.</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          {event.title}
        </h1>
        {event.category && (
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
            {event.category}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 mb-2">
        {event.location || "Location TBA"}
      </p>
      <p className="text-sm text-slate-700 mb-4">
        {event.description || "No description provided."}
      </p>
      <p className="text-xs text-slate-500 mb-1">
        Starts: {formatDate(event.start_time)}
      </p>
      {event.end_time && (
        <p className="text-xs text-slate-500 mb-3">
          Ends: {formatDate(event.end_time)}
        </p>
      )}
      {event.source && (
        <p className="text-xs text-slate-400 mb-3">Source: {event.source}</p>
      )}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          className={`text-sm px-4 py-2 rounded-lg ${
            isSaved
              ? "bg-green-50 text-green-700 border border-green-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSaved ? "Saved" : saving ? "Saving..." : "Save Event"}
        </button>
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            View original event
          </a>
        )}
        <Link
          to="/"
          className="ml-auto text-xs text-slate-500 hover:text-slate-700"
        >
          ← Back to events
        </Link>
      </div>
    </div>
  );
}

export default EventDetailsPage;
