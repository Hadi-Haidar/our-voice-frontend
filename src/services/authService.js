import { apiClient } from "./apiClient";

export const authService = {
    // la nsajel doukhoul l user (Login)
    async login(credentials) {
        // mnba3at request lal backend 3a /auth/login
        const response = await apiClient.post("/auth/login", credentials);

        // eza rja3 token men l backend, mnsayvo bl local storage
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    },

    // la n2ayed jdid (Register)
    async register(userData) {
        // l backend byotlob full_name, mna3mel mapped la name aw full_name
        const payload = {
            ...userData,
            full_name: userData.name || userData.full_name
        };
        // mnba3at chanta l backend
        const response = await apiClient.post("/auth/register", payload);

        // l OTP byenba3at 3al backend, hon ma mnsayyiv l token baad
        return response.data;
    },

    // la n2akked l email (Verify OTP)
    async verifyEmail(data) {
        // data: { email, otp_code }
        const response = await apiClient.post("/auth/verify-email", data);
        return response.data;
    },

    // ntlob OTP lal password l mensi
    async forgotPassword(email) {
        const response = await apiClient.post("/auth/forgot-password", { email });
        return response.data;
    },

    // nghayer l password bl OTP
    async resetPassword(data) {
        // data: { email, otp_code, new_password }
        const response = await apiClient.post("/auth/reset-password", data);
        return response.data;
    },

    // la na3mel logout
    async logout() {
        // mnshil l token men l local storage la yotla3
        localStorage.removeItem("token");
    },
};
