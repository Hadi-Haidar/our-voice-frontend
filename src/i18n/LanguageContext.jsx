import { createContext, useContext, useState, useLayoutEffect, useCallback, useMemo } from "react";
import translations from "./translations";

// Create the context
const LanguageContext = createContext(null);

// Storage key for localStorage
const STORAGE_KEY = "our-voice-lang";

// Default language
const DEFAULT_LANG = "en";

/**
 * LanguageProvider - Wrap your app with this to enable i18n
 * Provides: lang, setLang, t()
 */
export function LanguageProvider({ children }) {
    // Initialize language from localStorage or default
    const [lang, setLangState] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === "en" || saved === "ar") {
                // Set direction immediately before first render paint
                document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
                document.documentElement.lang = saved;
                return saved;
            }
            // Default setup
            document.documentElement.dir = DEFAULT_LANG === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = DEFAULT_LANG;
        }
        return DEFAULT_LANG;
    });

    // Update localStorage and document direction when language changes
    useLayoutEffect(() => {
        // Persist to localStorage
        localStorage.setItem(STORAGE_KEY, lang);

        // Set RTL/LTR direction
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    }, [lang]);

    // Language setter with validation
    const setLang = useCallback((newLang) => {
        if (newLang === "en" || newLang === "ar") {
            setLangState(newLang);
        } else {
            console.warn(`Invalid language: ${newLang}. Supported: "en", "ar"`);
        }
    }, []);

    /**
     * Translation function - gets text by dot notation key
     */
    const t = useCallback(
        (key, params = {}) => {
            const keys = key.split(".");
            let value = translations[lang];

            for (const k of keys) {
                if (value && typeof value === "object" && k in value) {
                    value = value[k];
                } else {
                    console.warn(`Translation missing: "${key}" for language "${lang}"`);
                    return key;
                }
            }

            if (typeof value === "string" && Object.keys(params).length > 0) {
                return Object.entries(params).reduce(
                    (str, [paramKey, paramValue]) =>
                        str.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue),
                    value
                );
            }

            return value;
        },
        [lang]
    );

    // Check if current language is RTL
    const isRTL = useMemo(() => lang === "ar", [lang]);

    // Memoize context value
    const value = useMemo(
        () => ({
            lang,
            setLang,
            t,
            isRTL,
        }),
        [lang, setLang, t, isRTL]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

/**
 * useLanguage hook
 */
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

export default LanguageContext;
