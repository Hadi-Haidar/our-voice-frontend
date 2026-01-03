import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Comments from "../components/Comments";
import AddCommentForm from "../components/AddCommentForm";
import { getIssueById } from "../services/issuesService";
import Button from "../components/Button";

export default function IssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState(() => getIssueById(id));

  function refresh() {
    setIssue(getIssueById(id));
  }

  if (!issue) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Issue not found</h1>
        <Link to="/issues" className="text-red-600 hover:underline">
          Back to issues
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Title + Status + Edit */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{issue.title}</h1>

          <div className="flex items-center gap-2">
            <StatusBadge status={issue.status} />

            <Link to={`/issues/${issue.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="text-gray-600">
        Category: <span className="font-medium">{issue.category}</span>
      </p>

      {/* Comments */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Comments</h2>
        <Comments comments={issue.comments} />
      </div>

      {/* Add Comment */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Add a comment</h2>
        <AddCommentForm issueId={issue.id} onAdded={refresh} />
      </div>

      <Link
        to="/issues"
        className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition"
      >
        Back to issues
      </Link>
    </section>
  );
}
