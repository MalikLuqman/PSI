// import { Navigate } from "react-router-dom";

// const ProtectedRoutes = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("token");

//   if (!isLoggedIn || isLoggedIn === "undefined") {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };
// export default ProtectedRoutes;

import { Navigate, useLocation, useParams } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const id = useParams();

  const userPermission = {
    "/dashboard/user-transactions": "user_transactions",
    "/dashboard": "view_dashboard",
    "/dashboard/books": "View_books",
    "/dashboard/books-orders": "orders",
    "/dashboard/profile": "profile",
  };

  const adminPermission = {
    "/dashboard/books-for-sale": "books_for_sale",
    "/dashboard/books-subjects": "view_subjects",
    "/dashboard/all-transactions": "view_all_transactions",
    "/dashboard": "view_dashboard",
    "/dashboard/books": "view_books",
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

  // addAdminDynamicRoute(
  //   "/admin/employees/view-employer",
  //   id?.id,
  //   "view_employer_profile"
  // );

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
