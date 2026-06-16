import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MemberPage from "../pages/modules/members/MemberPage.jsx";
import ProceedingMenuPage from "../pages/modules/proceedings/ProceedingMenuPage.jsx";
import ProceedingResidencePage from "../pages/modules/proceedings/residence/ProceedingPage.jsx";
import GoodConductPage from "../pages/modules/proceedings/good-conduct/GoodConductPage.jsx";
import EnviromentPage from "../pages/modules/proceedings/enviroment/EnviromentPage.jsx";
import EngineryPage from "../pages/modules/proceedings/enginery/EngineryPage.jsx";
import EconomyPage from "../pages/modules/proceedings/economy/EconomyPage.jsx";
import ClapPage from "../pages/modules/clap/clapPage.jsx";
import ProjectPage from "../pages/modules/projects/ProjectPage.jsx";
import ResidentPage from "../pages/modules/residents/ResidentPage.jsx";
import FinancePage from "../pages/modules/finances/FinancePage.jsx";
import MinutePage from "../pages/modules/minutes/MinutePage.jsx";
import DocumentPage from "../pages/modules/documents/DocumentPage.jsx";
import Dashboard from "../pages/modules/dashboard/dashboard.jsx";
import Login from "../pages/auth/Login.jsx";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />
        {/* Rutas protegidas: */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/members"     element={<MemberPage />} />
            <Route path="/clap"        element={<ClapPage />} />
            <Route path="/projects"    element={<ProjectPage />} />
            <Route path="/residents"   element={<ResidentPage />} />
            <Route path="/minutes"     element={<MinutePage />} />
            <Route path="/documents"   element={<DocumentPage />} />
            <Route path="/proceedings" element={<ProceedingMenuPage />} />
            <Route path="/proceedings/residence" element={<ProceedingResidencePage />} />     
            <Route path="/proceedings/good-conduct" element={<GoodConductPage />} />
            <Route path="/proceedings/enviroment" element={<EnviromentPage />} />
            <Route path="/proceedings/enginery" element={<EngineryPage />} />
            <Route path="/proceedings/economy" element={<EconomyPage />} />
            <Route path="/finances" element={<FinancePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
