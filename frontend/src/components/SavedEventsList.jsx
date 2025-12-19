import React from "react";
import EventCard from "./EventCard.jsx";

function SavedEventsList({ savedEvents }) {
  if (!savedEvents || savedEvents.length === 0) {
    return <p className="text-sm text-slate-500">No saved events yet.</p>;
  }

  // savedEvents are SavedEvent objects which include an `event` field (if you return that from API)
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {savedEvents.map((se) => (
        <EventCard
          key={se.id}
          event={se.event ?? se} // fallback if API returns plain events later
          onSave={null}
          isSaved={true}
        />
      ))}
    </div>
  );
}

export default SavedEventsList;
