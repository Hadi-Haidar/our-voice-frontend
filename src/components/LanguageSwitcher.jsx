import { useLanguage } from "../hooks/useLanguage";

/**
 * Language Switcher Component
 * Displays language toggle buttons (EN/AR)
 */
export default function LanguageSwitcher() {
    const { lang, setLang, t } = useLanguage();

    return (
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-1 transition-colors">
            <button
                onClick={() => setLang("en")}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${lang === "en"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                aria-label="Switch to English"
            >
                {t("language.en")}
            </button>
            <button
                onClick={() => setLang("ar")}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${lang === "ar"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                aria-label="Switch to Arabic"
            >
                {t("language.ar")}
            </button>
        </div>
    );
}
