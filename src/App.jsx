import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Landing from "./pages/Landing";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import SubmitIssue from "./pages/SubmitIssue";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import EditIssue from "./pages/EditIssue";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/submit" element={<SubmitIssue />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/issues/:id/edit" element={<EditIssue />} />
      </Route>
    </Routes>
  );
}
