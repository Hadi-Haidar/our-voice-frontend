import { NavLink } from "react-router-dom";
import logo from "../assets/logo.webp";
import { useLanguage } from "../hooks/useLanguage";
import ProfileDropdown from "./ProfileDropdown";
import NotificationBadge from "./NotificationBadge";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const base =
  "block rounded-lg px-3 py-2 text-sm font-medium transition";
const active = "bg-gray-100 text-gray-900";
const inactive = "text-gray-600 hover:bg-gray-100";

function AppNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `${base} ${isActive ? active : inactive}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar({ onMenuClick }) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-colors duration-200">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Menu button (mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger menu - visible on mobile/tablet, hidden on desktop */}
            <button
              onClick={onMenuClick}
              className="lg:hidden rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label={t("nav.openMenu")}
            >
              <HamburgerMenuIcon className="h-5 w-5" />
            </button>

            {/* Logo - Hidden on mobile, visible on sm and up */}
            <NavLink to="/" className="hidden sm:flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <img
                src={logo}
                alt="Our Voice Lebanon logo"
                className="h-10 w-auto object-contain"
              />
              <span>{t("nav.ourVoice")}</span>
            </NavLink>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2.5">
            <NotificationBadge />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
