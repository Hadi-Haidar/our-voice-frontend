import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import Landing from "./pages/Landing";
import Issues from "./pages/Issues";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
