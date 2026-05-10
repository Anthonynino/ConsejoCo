import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import MemberPage from "../pages/modules/members/MemberPage.jsx";
import ProceedingPage from "../pages/modules/proceedings/ProcedingsPage.jsx";
import ClapPage from "../pages/modules/clap/clapPage.jsx";
import ProjectPage from "../pages/modules/projects/ProjectPage.jsx";
import ResidentPage from "../pages/modules/residents/ResidentPage.jsx";
import MinutePage from "../pages/modules/minutes/MinutePage.jsx";
import DocumentPage from "../pages/modules/documents/DocumentPage.jsx";
import Dashboard from "../pages/modules/dashboard/dashboard.jsx";
import Login from "../pages/auth/login.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/members" element={<MemberPage />} />
          <Route path="/clap" element={<ClapPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/residents" element={<ResidentPage />} />
          <Route path="/minutes" element={<MinutePage />} />
          <Route path="/documents" element={<DocumentPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proceedings" element={<ProceedingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
