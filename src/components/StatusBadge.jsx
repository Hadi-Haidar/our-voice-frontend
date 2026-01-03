const styles = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Review": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
