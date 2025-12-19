import React from "react";
import { Link } from "react-router-dom";

function formatDate(str) {
  if (!str) return "";
  const d = new Date(str);
  return d.toLocaleString();
}

function EventCard({ event, onSave, isSaved }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            <Link to={`/events/${event.id}`} className="hover:underline">
              {event.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-500">
            {event.location || "Location TBA"}
          </p>
        </div>
        {event.category && (
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
            {event.category}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-700 line-clamp-2">
        {event.description || "No description provided."}
      </p>
      <p className="text-xs text-slate-500">
        Starts: {formatDate(event.start_time)}
      </p>
      {event.source && (
        <p className="text-xs text-slate-400">Source: {event.source}</p>
      )}
      <div className="flex justify-between items-center mt-2">
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            View source
          </a>
        )}
        {onSave && (
          <button
            onClick={() => onSave(event.id)}
            className={`ml-auto text-xs px-3 py-1 rounded-full border ${
              isSaved
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-blue-50 hover:border-blue-300"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventCard;
