import React from "react";

function Filters({ category, search, onCategoryChange, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
      >
        <option value="">All categories</option>
        <option value="Tech">Tech</option>
        <option value="Career">Career</option>
        <option value="Social">Social</option>
        <option value="Academic">Academic</option>
      </select>
    </div>
  );
}

export default Filters;
