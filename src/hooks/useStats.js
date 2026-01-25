import { useEffect, useState } from "react";
import { fetchStats } from "../services/statsService";

export function useStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then((data) => setStats(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
