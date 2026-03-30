import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import MemberPage from "../pages/modules/members/MemberPage.jsx";
import ClapPage from "../pages/modules/clap/clapPage.jsx";
import ProjectPage from "../pages/modules/projects/ProjectPage.jsx";
import ResidentPage from "../pages/modules/residents/ResidentPage.jsx";
import MinutePage from "../pages/modules/minutes/MinutePage.jsx";
import DocumentPage from "../pages/modules/documents/DocumentPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MemberPage />} />
          <Route path="/clap" element={<ClapPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/residents" element={<ResidentPage />} />
          <Route path="/minutes" element={<MinutePage />} />
          <Route path="/documents" element={<DocumentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
