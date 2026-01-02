import "./App.css";
import LayoutIndex from "./Layout/Index";
import { BrowserRouter, Route, Routes, HashRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import DashboardMain from "./Pages/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { DropdownProvider } from "./DropdownProvider/DropdownProvider";
import IndexProfile from "./Pages/Profile/IndexProfile";
import AllUsersTransactions from "./Pages/Admin/AllUsersTransactions";
import NoPermission from "./Components/NoPermission/NoPermission";
import IndexUsers from "./Pages/Users/IndexUsers";
import IndexSubscriber from "./Pages/Subscriber/IndexSubscriber";
import IndexBulkLookup from "./Pages/BulkLookup/IndexBulkLookup";

function App() {
  return (
    <>
      <DropdownProvider>
        <HashRouter>
          <Routes>
              {/* DEFAULT ROUTE */}
          <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            
              {/* LAYOUT + PROTECTED ROUTES */}
            <Route path="/*" element={<LayoutIndex />}>
              <Route
                path="dashboard/*"
                element={
                  <ProtectedRoutes>
                    <DashboardMain />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="subscriber" element={<IndexSubscriber />} />
                <Route path="bulk-lookup" element={<IndexBulkLookup />} />
                <Route
                  path="all-transactions"
                  element={<AllUsersTransactions />}
                />
                <Route path="users" element={<IndexUsers />} />
                <Route path="profile" element={<IndexProfile />} />
              </Route>
            </Route>
            <Route path="/no-permission" element={<NoPermission />} />
            {/* Protected Routes */}
          </Routes>
        </HashRouter>
      </DropdownProvider>
    </>
  );
}

export default App;
