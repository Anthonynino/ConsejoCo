import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import MemberPage from "../pages/MemberPage.jsx"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>
            <Route path="/miembros" element={<MemberPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}