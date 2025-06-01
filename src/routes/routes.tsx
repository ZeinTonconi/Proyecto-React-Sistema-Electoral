import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterUsers from "../components/RegisterUsersForm";
import VotePage from "../pages/VotePage";
import { Layout } from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../guards/ProtectedRoutes";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUsers />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vote-page" element={<VotePage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;