import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterUsers from "../components/RegisterUsersForm";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterUsers/>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesApp;