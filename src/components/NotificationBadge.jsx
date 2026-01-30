import { BellIcon } from "@radix-ui/react-icons";

export default function NotificationBadge() {
    return (
        <button
            type="button"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition hover:bg-gray-50 dark:hover:bg-gray-900 shadow-sm"
        >
            <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors" />
        </button>
    );
}
