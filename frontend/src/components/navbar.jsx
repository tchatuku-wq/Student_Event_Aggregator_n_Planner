import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-lg text-slate-800">
          Student Events
        </div>
        <div className="space-x-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-blue-50"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full ${
                isActive
                  ? "bg-blue-600 text白"
                  : "text-slate-700 hover:bg-blue-50"
              }`.replace("白", "white") // small hack to keep rendering clean 🙂
            }
          >
            My Events
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
