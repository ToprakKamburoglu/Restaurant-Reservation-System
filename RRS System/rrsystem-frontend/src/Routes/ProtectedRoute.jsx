import { useAuth } from "../Routes/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedUserTypes }) => {
    const { isAuthenticated, userType } = useAuth();
    const location = useLocation();

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedUserTypes.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
