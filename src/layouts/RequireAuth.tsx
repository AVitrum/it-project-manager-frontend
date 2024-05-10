import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

function RequireAuth() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return (
        token
            ? <div className="test"><Outlet /></div> 
            : <Navigate to="/welcome" state={{ from: location }} replace />
    );
};
export default RequireAuth;