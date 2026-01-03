const STORAGE_KEY = "our-voice-issues";

const initialIssues = [
  {
    id: "1",
    title: "Street lights not working",
    category: "Electricity",
    status: "Pending",
    comments: ["Lights have been off for two weeks"],
    votes: 3,
  },
  {
    id: "2",
    title: "Water supply interruption",
    category: "Water",
    status: "In Review",
    comments: [],
    votes: 1,
  },
  {
    id: "3",
    title: "Potholes on main road",
    category: "Roads",
    status: "Resolved",
    comments: ["Road fixed last week"],
    votes: 5,
  },
];


function loadIssues() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : initialIssues;
}

function saveIssues(issues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

export function getIssues() {
  return loadIssues();
}

export function getIssueById(id) {
  return loadIssues().find((issue) => issue.id === id);
}

export function createIssue(data) {
  const issues = loadIssues();

  const newIssue = {
    id: Date.now().toString(),
    status: "Pending",
    comments: [],
    ...data,
  };

  const updated = [newIssue, ...issues];
  saveIssues(updated);

  return newIssue;
}
export function addComment(issueId, text) {
  const issues = loadIssues();
  const index = issues.findIndex((i) => i.id === issueId);
  if (index === -1) return;

  issues[index].comments = [...issues[index].comments, text];
  saveIssues(issues);
}
export function upvoteIssue(issueId) {
  const issues = loadIssues();
  const issue = issues.find((i) => i.id === issueId);
  if (!issue) return;

  issue.votes += 1;
  saveIssues(issues);
}

export function downvoteIssue(issueId) {
  const issues = loadIssues();
  const issue = issues.find((i) => i.id === issueId);
  if (!issue) return;

  issue.votes = Math.max(0, issue.votes - 1);
  saveIssues(issues);
}

export function deleteIssue(issueId) {
  const issues = loadIssues().filter((i) => i.id !== issueId);
  saveIssues(issues);
}
export function updateIssue(issueId, data) {
  const issues = loadIssues();
  const index = issues.findIndex((i) => i.id === issueId);
  if (index === -1) return;

  issues[index] = { ...issues[index], ...data };
  saveIssues(issues);

  return issues[index];
}
