import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../contexts/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.webp";
import {
    Cross1Icon,
    HamburgerMenuIcon,
    PersonIcon,
    HomeIcon,
    ReaderIcon,
    InfoCircledIcon,
    ChatBubbleIcon,
    GlobeIcon,
    BarChartIcon,
    BellIcon,
    MoonIcon,
    SunIcon,
    QuestionMarkCircledIcon,
    HeartFilledIcon,
} from "@radix-ui/react-icons";

export default function Sidebar({ isOpen, onClose, expanded, onExpandedChange }) {
    const { t, isRTL } = useLanguage();
    const { isDark, toggleTheme } = useTheme();

    // Use prop if provided, otherwise internal state
    const desktopExpanded = expanded;
    const setDesktopExpanded = onExpandedChange;

    // Close sidebar on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    // Main navigation items
    const mainNavItems = [
        { key: "home", to: "/", icon: HomeIcon, label: t("nav.home") },
        { key: "issues", to: "/issues", icon: ReaderIcon, label: t("nav.issues") },
        { key: "polls", to: "/polls", icon: BarChartIcon, label: t("nav.polls") },
        { key: "announcements", to: "/announcements", icon: BellIcon, label: t("nav.announcements") },
        { key: "community-chat", to: "/chat", icon: GlobeIcon, label: t("nav.communityChat") },
        { key: "district-chat", to: "/district-chat", icon: ChatBubbleIcon, label: t("nav.districtChat") },
    ];

    const supportNavItems = [
        { key: "about", to: "/about", icon: InfoCircledIcon, label: t("nav.about") },
        { key: "help", to: "/help", icon: QuestionMarkCircledIcon, label: t("nav.helpCenter") },
    ];

    const donateItem = { key: "donate", to: "/donate", icon: HeartFilledIcon, label: t("nav.donate") };

    // Full sidebar content (expanded state)
    const sidebarContent = (
        <>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Main Navigation */}
                <nav className="space-y-1">
                    {mainNavItems.map((item) => (
                        <NavLink
                            key={item.key}
                            to={item.to}
                            end={item.to === "/"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${isActive
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-sm"
                                    : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Support Section */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1">
                    <nav className="space-y-1">
                        {supportNavItems.map((item) => (
                            <NavLink
                                key={item.key}
                                to={item.to}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition ${isActive
                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-sm"
                                        : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`
                                }
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Donation Section */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                    <nav>
                        <NavLink
                            to={donateItem.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm transition ${isActive
                                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-medium shadow-sm"
                                    : "text-gray-700 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                                }`
                            }
                        >
                            <donateItem.icon className="h-4 w-4" />
                            {donateItem.label}
                        </NavLink>
                    </nav>
                </div>

                {/* Theme Toggle */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
                    >
                        <div className="flex items-center gap-2">
                            {isDark ? (
                                <SunIcon className="h-4 w-4 text-gray-400" />
                            ) : (
                                <MoonIcon className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="text-sm font-medium">
                                {isDark ? t("sidebar.lightMode") : t("sidebar.darkMode")}
                            </span>
                        </div>
                        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isDark ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}>
                            <div
                                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${isDark
                                    ? (isRTL ? "-translate-x-5 right-0.5" : "translate-x-5 left-0.5")
                                    : (isRTL ? "right-0.5" : "left-0.5")
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                {/* Language Switcher */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between px-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Language
                        </span>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Auth Section - Bottom */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1.5">
                <Link
                    to="/login"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    <PersonIcon className="h-4 w-4" />
                    {t("sidebar.login")}
                </Link>
                <Link
                    to="/signup"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-gray-900 dark:bg-gray-100 px-4 py-2.5 text-sm font-medium text-white dark:text-gray-900 transition hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                    {t("sidebar.signup")}
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* ==================== MOBILE ==================== */}
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Mobile (drawer) */}
            <aside
                className={`fixed top-0 ${isRTL ? "right-0" : "left-0"
                    } z-50 h-full w-72 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen
                        ? "translate-x-0"
                        : isRTL
                            ? "translate-x-full"
                            : "-translate-x-full"
                    }`}
            >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <Link
                        to="/"
                        onClick={onClose}
                        className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white"
                    >
                        <img
                            src={logo}
                            alt="Our Voice Lebanon logo"
                            className="h-8 w-auto object-contain"
                        />
                        <span>{t("nav.ourVoice")}</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-gray-200 dark:border-gray-700"
                        aria-label={t("sidebar.closeSidebar")}
                    >
                        <Cross1Icon className="h-4 w-4" />
                    </button>
                </div>

                {sidebarContent}
            </aside>

            {/* ==================== DESKTOP ==================== */}
            {/* Desktop Sidebar - Collapsible */}
            <aside
                className={`hidden lg:flex lg:flex-col lg:fixed lg:top-[57px] lg:bottom-0 lg:start-0 lg:bg-white dark:bg-gray-900 lg:border-e lg:border-gray-200 dark:border-gray-800 transition-[width] duration-300 ease-in-out ${desktopExpanded ? "lg:w-64" : "lg:w-16"
                    }`}
            >
                {/* Toggle Button - Always visible */}
                <div className={`p-3 ${desktopExpanded ? "border-b border-gray-200 dark:border-gray-800" : ""}`}>
                    <button
                        onClick={() => setDesktopExpanded(!desktopExpanded)}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
                        aria-label={desktopExpanded ? t("sidebar.closeSidebar") : t("sidebar.openSidebar")}
                    >
                        <HamburgerMenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Sidebar Content - Fixed width container to prevent reflow/stretching during animation */}
                <div className="flex-1 overflow-hidden">
                    <div className="w-64 h-full flex flex-col">
                        <div
                            className={`flex-1 flex flex-col transition-opacity duration-200 ${desktopExpanded ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {sidebarContent}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

// Export for layout
export function useSidebarWidth() {
    const [expanded, setExpanded] = useState(true);
    return expanded ? 256 : 64;
}
