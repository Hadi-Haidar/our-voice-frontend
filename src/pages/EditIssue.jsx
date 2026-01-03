import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { getIssueById, updateIssue } from "../services/issuesService";

const categories = ["Electricity", "Water", "Roads", "Internet", "Other"];

export default function EditIssue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = getIssueById(id);

  const [form, setForm] = useState(() =>
    issue
      ? {
          title: issue.title,
          category: issue.category,
          description: issue.description ?? "",
        }
      : { title: "", category: "", description: "" }
  );

  if (!issue) {
    return <p className="text-gray-600">Issue not found.</p>;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateIssue(id, form);
    navigate(`/issues/${id}`);
  }

  return (
    <section className="max-w-xl space-y-6">
      <PageHeader title="Edit Issue" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </section>
  );
}
