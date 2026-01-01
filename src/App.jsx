import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Landing from "./pages/Landing";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import SubmitIssue from "./pages/SubmitIssue";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/submit" element={<SubmitIssue />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}
