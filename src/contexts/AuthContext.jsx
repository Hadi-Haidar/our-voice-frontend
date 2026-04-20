import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount: validate the stored token against the backend's /auth/me endpoint.
    // If the token is expired or invalid the backend returns 401,
    // we clear localStorage and set user to null.
    useEffect(() => {
        const validate = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await authService.getMe();
                if (response.success) {
                    // Merge with any extra fields stored locally (e.g. mock balance)
                    const stored = localStorage.getItem("user");
                    const stored_parsed = stored ? JSON.parse(stored) : {};
                    setUser({ ...stored_parsed, ...response.user, balance: stored_parsed.balance ?? 100 });
                } else {
                    throw new Error("Token invalid");
                }
            } catch {
                // Token expired or tampered – clean up
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        validate();
    }, []);

    // fn l login
    const login = async (credentials) => {
        const response = await authService.login(credentials);
        // Add mock balance (replace once backend supports it)
        const userWithBalance = { ...response.user, balance: 100 };
        setUser(userWithBalance);
        localStorage.setItem("user", JSON.stringify(userWithBalance));
        return response;
    };

    // fn l register
    const register = async (userData) => {
        const response = await authService.register(userData);
        return response;
    };

    // fn l OTP verify
    const verifyEmail = async (data) => {
        const response = await authService.verifyEmail(data);
        return response;
    };

    // fn l forgot password
    const forgotPassword = async (email) => {
        const response = await authService.forgotPassword(email);
        return response;
    };

    // fn l reset password
    const resetPassword = async (data) => {
        const response = await authService.resetPassword(data);
        return response;
    };

    // fn l logout
    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, verifyEmail, forgotPassword, resetPassword, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook lal auth
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
