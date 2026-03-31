import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const SIDEBAR_STORAGE_KEY = "our-voice-sidebar-expanded";

export default function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return saved === null ? false : saved === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarExpanded);
  }, [sidebarExpanded]);

  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide footer on specific pages
  const hideFooterRoutes = [
    "/issues",
    "/polls",
    "/announcements",
    "/chat",
    "/district-chat",
    "/help",
    "/donate"
  ];
  const shouldShowFooter = !hideFooterRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
      />

      {/* Main content - offset for sidebar on desktop */}
      <div
        className={`flex-1 flex flex-col transition-[margin] duration-300 ease-in-out will-change-[margin] ${sidebarExpanded ? "lg:ms-64" : "lg:ms-16"
          }`}
      >
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
          <Outlet />
        </main>

        {shouldShowFooter && <Footer />}
      </div>
    </div>
  );
}
