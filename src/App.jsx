import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Landing from "./pages/Landing";
import Issues from "./pages/Issues";
import Polls from "./pages/Polls";
import Announcements from "./pages/Announcements";
import CommunityChat from "./pages/CommunityChat";
import DistrictChat from "./pages/DistrictChat";
import HelpCenter from "./pages/HelpCenter";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ReportIssue from "./pages/ReportIssue";
import IssueDetails from "./pages/IssueDetails";
import EditIssue from "./pages/EditIssue";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Auth routes - no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ForgotPassword />} />

      {/* Main app routes - with layout */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/issues/:id/edit" element={<EditIssue />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/chat" element={<CommunityChat />} />
        <Route path="/district-chat" element={<DistrictChat />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
}
