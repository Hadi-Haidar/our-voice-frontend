import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in (has token)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // In a real app, you'd validate the token with the backend
            // For now, we'll just check if it exists
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        // The backend requires OTP verification before logging in,
        // so we don't set the user or token yet.
        return response;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
