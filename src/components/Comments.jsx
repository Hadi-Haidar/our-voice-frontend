export default function Comments({ comments = [] }) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No comments yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment, index) => (
        <li
          key={index}
          className="rounded-lg border border-gray-200 p-3 text-sm"
        >
          {comment}
        </li>
      ))}
    </ul>
  );
}
