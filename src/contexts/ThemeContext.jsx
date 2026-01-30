import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "our-voice-theme";

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved === "dark" || saved === "light") {
                return saved === "dark";
            }
            // Check system preference
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        localStorage.setItem(THEME_STORAGE_KEY, theme);

        // Apply theme to document
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
//this as a shortcut to use the theme context in other components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
