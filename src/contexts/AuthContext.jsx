import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // net2akkad eza l user 3emil login men abel w 3endo token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // hon mna3mel validate lal token mnel backend in the future
            // l hallaq mnet2akkad bas eno mawjoud bl local storage
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                // Add mock balance for testing paid features
                setUser({ ...parsedUser, balance: 100 });
            }
        }
        setLoading(false);
    }, []);

    // fn l login
    const login = async (credentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
    };

    // fn l register
    const register = async (userData) => {
        const response = await authService.register(userData);
        // l backend bado OTP abl mantal3o l user w na3tih token,
        // so hon bas mnraji3 response la ykambel khtwit l te2keed bl OTP.
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
