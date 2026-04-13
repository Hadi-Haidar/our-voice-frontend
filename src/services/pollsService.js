import { apiClient } from "./apiClient";
import { pollsMock } from "../data/pollsMock";

export const pollsService = {
  /**
   * Fetch all polls and ads (mixed feed)
   * Falls back to mock data if the backend API is not yet ready.
   */
  async getFeed() {
    try {
      // In the future, this will be /api/polls
      const response = await apiClient.get("/polls");
      return response.data;
    } catch (error) {
      console.warn("Polls API not found or failed, using mock data:", error.message);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, data: pollsMock };
    }
  },

  /**
   * Submit a vote for a poll
   */
  async vote(pollId, optionId) {
    try {
      const response = await apiClient.post(`/polls/${pollId}/vote`, { optionId });
      return response.data;
    } catch (error) {
      console.warn("Voting API failed, simulating success with mock logic:", error.message);
      return { success: true, message: "Vote submitted successfully" };
    }
  },

  /**
   * Request a new paid poll from admin
   */
  async requestPaidPoll(pollData) {
    try {
      const response = await apiClient.post("/polls/request", pollData);
      return response.data;
    } catch (error) {
      console.warn("Poll request API failed, simulating success:", error.message);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: "Request submitted successfully" };
    }
  }
};
