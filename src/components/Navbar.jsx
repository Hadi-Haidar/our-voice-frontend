import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.webp"; 

const base =
  "block rounded-lg px-3 py-2 text-sm font-medium transition";
const active = "bg-gray-100 text-gray-900";
const inactive = "text-gray-600 hover:bg-gray-100";

function AppNavLink({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `${base} ${isActive ? active : inactive}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <img
              src={logo}
              alt="Our Voice Lebanon logo"
              className="h-12 w-17 object-contain"
            />
            <span>Our Voice</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <AppNavLink to="/">Home</AppNavLink>
            <AppNavLink to="/issues">Issues</AppNavLink>
            <AppNavLink to="/submit">Submit</AppNavLink>
            <AppNavLink to="/about">About</AppNavLink>
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg border px-3 py-2 text-sm"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="mt-4 space-y-1 md:hidden">
            <AppNavLink to="/" onClick={() => setOpen(false)}>
              Home
            </AppNavLink>
            <AppNavLink to="/issues" onClick={() => setOpen(false)}>
              Issues
            </AppNavLink>
            <AppNavLink to="/submit" onClick={() => setOpen(false)}>
              Submit
            </AppNavLink>
            <AppNavLink to="/about" onClick={() => setOpen(false)}>
              About
            </AppNavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
