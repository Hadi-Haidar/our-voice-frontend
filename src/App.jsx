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
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/chat" element={<CommunityChat />} />
        <Route path="/district-chat" element={<DistrictChat />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
