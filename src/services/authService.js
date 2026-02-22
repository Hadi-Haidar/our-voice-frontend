import { apiClient } from "./apiClient";

export const authService = {
    async login(credentials) {
        const response = await apiClient.post("/auth/login", credentials);
        // Assuming your backend returns { user, token }
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    async register(userData) {
        // Backend expects full_name, while frontend currently sends name
        const payload = {
            ...userData,
            full_name: userData.name || userData.full_name
        };
        const response = await apiClient.post("/auth/register", payload);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    async logout() {
        // Remove token from local storage
        localStorage.removeItem("token");
    },
};
