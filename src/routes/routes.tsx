import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import VotePage from "../pages/VotePage";
import { Layout } from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import VotingManagement from "../pages/VotingManagement";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import CenterManagement from "../pages/CenterManagement";
import RegisterCandidate from "../pages/RegisterCandidate";
import TablesManagment from "../pages/TablesManagement";
import { useAuth } from "../contexts/AuthContext";
import CandidateManagement from "../pages/CandidateManagement";
import VoteConfirmationPage from "../pages/VoteConfirmationPage";
import { useAuthStore } from "../store/authStore";

const RoutesApp = () => {
  const { user } = useAuthStore((state) => state);
  const {isAdmin} = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="vote-page"
            element={
              user.hasVoted ? (
                <Navigate to="/vote-confirmation" />
              ) : (
                <VotePage />
              )
            }
          />

          <Route path="voting-management" element={<VotingManagement />} />
          <Route
            path="vote-confirmation"
            element={
              user.hasVoted ? (
                <VoteConfirmationPage />
              ) : (
                <Navigate to="/vote-page" replace />
              )
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route
            path="user-management"
            element={
             isAdmin? (
                <UserManagement />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="center-management"
            element={
             isAdmin? (
                <CenterManagement />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="register-candidate"
            element={
             isAdmin? (
                <RegisterCandidate />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="candidate-management"
            element={
              isAdmin ? (
                <CandidateManagement />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="tables-management"
            element={
             isAdmin? (
                <TablesManagment />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesApp;
