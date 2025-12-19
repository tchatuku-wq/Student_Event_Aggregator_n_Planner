import React from "react";
import EventCard from "./EventCard.jsx";

function EventList({ events, onSave, savedIds = [] }) {
  if (!events || events.length === 0) {
    return <p className="text-sm text-slate-500">No events found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((ev) => (
        <EventCard
          key={ev.id}
          event={ev}
          onSave={onSave}
          isSaved={savedIds.includes(ev.id)}
        />
      ))}
    </div>
  );
}

export default EventList;
