import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import MemberPage from "../pages/modules/members/MemberPage.jsx";
import ClapPage from "../pages/modules/clap/clapPage.jsx";
import ProjectPage from "../pages/modules/projects/ProjectPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MemberPage />} />
          <Route path="/clap" element={<ClapPage />} />
          <Route path="/projects" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
