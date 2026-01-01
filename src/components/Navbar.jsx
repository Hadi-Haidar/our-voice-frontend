import { NavLink } from "react-router-dom";

const navLinkBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100";
const navLinkActive = "bg-gray-100 text-gray-900";
const navLinkInactive = "text-gray-600";

function AppNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
      }
      end={to === "/"}
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-bold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 text-white">
            🇱🇧
          </span>
          <span>Our Voice</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <AppNavLink to="/">Home</AppNavLink>
          <AppNavLink to="/issues">Issues</AppNavLink>
          <AppNavLink to="/submit">Submit</AppNavLink>
          <AppNavLink to="/about">About</AppNavLink>
        </nav>
      </div>
    </header>
  );
}
