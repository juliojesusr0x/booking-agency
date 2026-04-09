import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-base font-medium border-b-2 pb-2 transition-colors no-underline",
    isActive
      ? "border-blue-600 text-blue-600"
      : "border-transparent text-gray-500 hover:text-blue-600",
  ].join(" ");

export const Navigation: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-semibold text-blue-600 no-underline transition hover:text-blue-700"
        >
          <img src="/logo.svg" alt="Booking Agency" className="h-8 w-auto" />
          <span>Booking Agency</span>
        </Link>
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((open) => !open)}
          className="relative inline-flex md:hidden"
        >
          <span className="block h-0.5 w-6 rounded-full bg-gray-600 before:absolute before:left-0 before:top-[-6px] before:h-0.5 before:w-6 before:rounded-full before:bg-gray-600 before:content-[''] after:absolute after:left-0 after:top-[6px] after:h-0.5 after:w-6 after:rounded-full after:bg-gray-600 after:content-['']" />
        </button>
        <div className="hidden gap-8 md:flex md:items-center">
          <NavLink to="/" className={navLinkClass} end>
            Search Properties
          </NavLink>
          <NavLink to="/bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
        </div>
      </div>
      {isMobileOpen && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 border-t border-gray-100 pt-3 md:hidden">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setIsMobileOpen(false)}
            end
          >
            Search Properties
          </NavLink>
          <NavLink
            to="/bookings"
            className={navLinkClass}
            onClick={() => setIsMobileOpen(false)}
          >
            My Bookings
          </NavLink>
        </div>
      )}
    </nav>
  );
};
