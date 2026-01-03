import { useState } from "react";
import { addComment } from "../services/issuesService";

export default function AddCommentForm({ issueId, onAdded }) {
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment(issueId, comment.trim());
    setComment("");
    onAdded?.(); // optional refresh hook
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="Write a comment..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
      />

      <button
        type="submit"
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
      >
        Add Comment
      </button>
    </form>
  );
}
