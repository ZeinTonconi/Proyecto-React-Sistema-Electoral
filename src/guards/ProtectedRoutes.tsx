import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

    const {user} = useAuth()

    return <>{user && user.token ? children : <Navigate to = "/login" />}</>

};

export default ProtectedRoutes;