import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import VoteButtons from "./VoteButtons";
import { upvoteIssue, downvoteIssue, deleteIssue } from "../services/issuesService";
import { useToast } from "./Toast";

export default function IssueCard({ issue, onChange }) {
  const toast = useToast(); // ✅ INSIDE component

  function handleUpvote(e) {
    e.preventDefault();
    upvoteIssue(issue.id);
    onChange?.();
  }

  function handleDownvote(e) {
    e.preventDefault();
    downvoteIssue(issue.id);
    onChange?.();
  }

function handleDelete(e) {
  e.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this issue?"
  );

  if (!confirmed) return;

  deleteIssue(issue.id);
  toast.show("Issue deleted");
  onChange?.();
}


  return (
    <Link
      to={`/issues/${issue.id}`}
      className="block rounded-xl border border-gray-200 p-5 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{issue.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{issue.category}</p>
        </div>

        <div className="flex items-center gap-3">
          <VoteButtons
            votes={issue.votes}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />

          <StatusBadge status={issue.status} />

          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}
