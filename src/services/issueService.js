import { apiClient } from "./apiClient";

export const issueService = {
    // Get all issues with optional filters
    getAllIssues: async (filters = {}) => {
        try {
            // filters can include category_id, status, search, etc.
            const response = await apiClient.get("/issues", { params: filters });
            return response.data; // This returns { success: true, data: [...] }
        } catch (error) {
            console.error("Error fetching issues:", error);
            throw error;
        }
    },

    // Get a single issue by ID
    getIssueById: async (id) => {
        try {
            const response = await apiClient.get(`/issues/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching issue ${id}:`, error);
            throw error;
        }
    },

    // Create a new issue
    createIssue: async (issueData) => {
        try {
            const response = await apiClient.post("/issues", issueData);
            return response.data;
        } catch (error) {
            console.error("Error creating issue:", error);
            throw error;
        }
    },

    // Toggle upvote
    toggleUpvote: async (id) => {
        try {
            const response = await apiClient.post(`/issues/${id}/upvote`);
            return response.data;
        } catch (error) {
            console.error(`Error toggling upvote for ${id}:`, error);
            throw error;
        }
    },

    // Add comment
    addComment: async (id, text) => {
        try {
            const response = await apiClient.post(`/issues/${id}/comments`, { text });
            return response.data;
        } catch (error) {
            console.error(`Error adding comment to ${id}:`, error);
            throw error;
        }
    },

    // Update an existing comment
    updateComment: async (issueId, commentId, text) => {
        try {
            const response = await apiClient.patch(`/issues/${issueId}/comments/${commentId}`, { text });
            return response.data;
        } catch (error) {
            console.error(`Error updating comment ${commentId}:`, error);
            throw error;
        }
    },

    // Delete a comment
    deleteComment: async (issueId, commentId) => {
        try {
            const response = await apiClient.delete(`/issues/${issueId}/comments/${commentId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting comment ${commentId}:`, error);
            throw error;
        }
    },

    // Update an existing issue
    updateIssue: async (id, issueData) => {
        try {
            const response = await apiClient.patch(`/issues/${id}`, issueData);
            return response.data;
        } catch (error) {
            console.error(`Error updating issue ${id}:`, error);
            throw error;
        }
    },

    // Delete an issue
    deleteIssue: async (id) => {
        try {
            const response = await apiClient.delete(`/issues/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting issue ${id}:`, error);
            throw error;
        }
    },

    // Upload media file
    uploadMedia: async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await apiClient.post("/issues/upload-media", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 30000, // Increase timeout specifically for uploads
            });
            return response.data; // { success: true, url: '...' }
        } catch (error) {
            console.error("Error uploading media:", error);
            throw error;
        }
    }
};
