
const MOCK_STORAGE_KEY = 'mock_users';
const DELAY_MS = 800;

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get users from localStorage
const getUsers = () => {
    const users = localStorage.getItem(MOCK_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users) => {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(users));
};

export const mockAuthService = {
    async login(credentials) {
        await delay(DELAY_MS);
        const users = getUsers();
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Simulate returning a JWT token and user info
        const mockResponse = {
            user: { id: user.id, email: user.email, name: user.name },
            token: "mock-jwt-token-xyz-123"
        };

        localStorage.setItem("token", mockResponse.token);
        return mockResponse;
    },

    async register(userData) {
        await delay(DELAY_MS);
        const users = getUsers();

        if (users.find(u => u.email === userData.email)) {
            throw new Error("User with this email already exists");
        }

        const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            password: userData.password,
            name: userData.name
        };

        users.push(newUser);
        saveUsers(users);

        const mockResponse = {
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
            token: "mock-jwt-token-xyz-123"
        };

        localStorage.setItem("token", mockResponse.token);
        return mockResponse;
    },

    async logout() {
        await delay(400);
        localStorage.removeItem("token");
        return { success: true };
    }
};
