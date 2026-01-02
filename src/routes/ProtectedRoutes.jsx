
import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const id = useParams();

  const userPermission = {
    "/dashboard/user-transactions": "user_transactions",
    "/dashboard": "view_dashboard",
    "/dashboard/subscriber": "View_subscriber",
    "/dashboard/books-orders": "orders",
    "/dashboard/profile": "profile",
  };

  const adminPermission = {
    "/dashboard/bulk-lookup": "bulk_lookup",
    "/dashboard/books-subjects": "view_subjects",
    "/dashboard/all-transactions": "view_all_transactions",
    "/dashboard": "view_dashboard",
    "/dashboard/subscriber": "View_subscriber",
    "/dashboard/books-orders": "orders",
    "/dashboard/profile": "profile",
    "/dashboard/users": "users",
  };

  const addUserRoute = (basePath, id, permission) => {
    const dynamicPath = `${basePath}/${id}`;
    userPermission[dynamicPath] = permission;
  };

  const addAdminDynamicRoute = (basePath, id, permission) => {
    const dynamicPath = `${basePath}/${id}`;
    adminPermission[dynamicPath] = permission;
  };

  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();
  const userRequiredPermissions = userPermission[location.pathname];
  const adminRequiredPermissions = adminPermission[location.pathname];
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (localStorage.role_id == 2) {
    if (!userRequiredPermissions) {
      return <Navigate to="/no-permission" replace />;
    }
  }
  if (localStorage.role_id == 1) {
    if (!adminRequiredPermissions) {
      return <Navigate to="/no-permission" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
