import Button from "./Button";

export default function VoteButtons({ votes, onUpvote, onDownvote }) {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={onUpvote}>+</Button>
      <span className="min-w-[2rem] text-center text-sm font-medium">
        {votes}
      </span>
      <Button variant="secondary" onClick={onDownvote}>
        −
      </Button>
    </div>
  );
}
