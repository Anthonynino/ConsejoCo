import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import MemberPage from "../pages/modules/members/MemberPage.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>
            <Route path="/" element={<MemberPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}