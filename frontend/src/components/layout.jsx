import React from "react";
import Navbar from "./Navbar.jsx";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t mt-8 py-4 text-center text-sm text-slate-500 bg-white">
        Student Event Aggregator & Planner &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Layout;
