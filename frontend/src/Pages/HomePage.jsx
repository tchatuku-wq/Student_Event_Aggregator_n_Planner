import React, { useEffect, useState } from "react";
import { fetchEvents, fetchSavedEvents, saveEvent } from "../api/client.js";
import Filters from "../components/Filters.jsx";
import EventList from "../components/EventList.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const savedIds = savedEvents.map((se) =>
    se.event ? se.event.id : se.event_id
  );

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEvents({
        category: category || undefined,
        search: search || undefined,
      });
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const loadSaved = async () => {
    try {
      const data = await fetchSavedEvents();
      setSavedEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEvents();
    loadSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // reload events on filter changes
    const timeout = setTimeout(() => {
      loadEvents();
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search]);

  const handleSaveEvent = async (eventId) => {
    try {
      setSaving(true);
      await saveEvent(eventId);
      await loadSaved();
    } catch (err) {
      console.error(err);
      setError("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Explore Events</h1>
      <p className="text-sm text-slate-600 mb-4">
        Browse upcoming campus events. Filter by category or search by title,
        then save events to your dashboard.
      </p>

      <Filters
        category={category}
        search={search}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
      />

      {error && <ErrorMessage message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <EventList
          events={events}
          onSave={handleSaveEvent}
          savedIds={savedIds}
        />
      )}
      {saving && (
        <p className="text-xs text-slate-500 mt-2">Saving event...</p>
      )}
    </div>
  );
}

export default HomePage;
