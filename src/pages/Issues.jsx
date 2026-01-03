import { useState } from "react";
import IssueCard from "../components/IssueCard";
import PageHeader from "../components/PageHeader";
import { getIssues } from "../services/issuesService";

const categories = ["All", "Electricity", "Water", "Roads", "Internet", "Other"];
const sortOptions = ["Newest", "Most Voted"];

export default function Issues() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [search, setSearch] = useState("");
  const [issues, setIssues] = useState(() => getIssues());

  function refresh() {
    setIssues(getIssues());
  }

  let filtered = issues.filter((issue) =>
    issue.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "All") {
    filtered = filtered.filter((issue) => issue.category === category);
  }

  if (sort === "Most Voted") {
    filtered = [...filtered].sort((a, b) => b.votes - a.votes);
  } else {
    filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id));
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Issues"
        description="Browse, search, and vote on community issues."
      />

      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search issues..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          {sortOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No issues found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((issue) => (
            <IssueCard
              key={`${issue.id}-${issue.votes}`}
              issue={issue}
              onChange={refresh}
            />
          ))}
        </div>
      )}
    </section>
  );
}
