import { Navigate } from "react-router-dom";

function UserProtectedRoute({ children }) {

    const user = JSON.parse(
        localStorage.getItem("jwello_user")
    );

    if (!user || user.role !== "user") {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default UserProtectedRoute;