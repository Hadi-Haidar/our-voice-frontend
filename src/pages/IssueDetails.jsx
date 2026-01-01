import { useParams } from "react-router-dom";

export default function IssueDetails() {
  const { id } = useParams();

  return (
    <h1 className="text-3xl font-bold">
      Issue {id}
    </h1>
  );
}
