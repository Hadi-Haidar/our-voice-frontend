import { apiClient } from "./apiClient";
import { mockAuthService } from "./mockAuthService";
import { ENV } from "../config/env";

const realAuthService = {
    async login(credentials) {
        const response = await apiClient.post("/auth/login", credentials);
        // Assuming your backend returns { user, token }
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    async register(userData) {
        const response = await apiClient.post("/auth/register", userData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    async logout() {
        await apiClient.post("/auth/logout");
        localStorage.removeItem("token");
    },
};

// This is the Magic Switch!
export const authService = ENV.USE_MOCK ? mockAuthService : realAuthService;
