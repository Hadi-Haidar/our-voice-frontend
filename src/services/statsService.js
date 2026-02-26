import { statsMock } from "../data/statsMock";
import { apiClient } from "./apiClient";

// fn la njib arqam l stats (bta3mel real request, w iza feshlet btraje3 mock data)
export async function fetchStats() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds timeout

  try {
    const response = await apiClient.get("/stats", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Stats API failed, falling back to mock:", error.message);
    return statsMock;
  }
}
