import { statsMock } from "../data/statsMock";
import { apiClient } from "./apiClient";
import { ENV } from "../config/env";

export async function fetchStats() {
  if (ENV.USE_MOCK) {
    return statsMock; // ✅ array
  }

  const res = await apiClient.get("/stats");

  // ✅ Normalize response shape
  return Array.isArray(res.data) ? res.data : res.data.data;
}
