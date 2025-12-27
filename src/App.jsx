import { useState } from "react";

import "./App.css";
import LandingIndex from "./Pages/LandingPage/Index";
import LayoutIndex from "./Layout/Index";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import ShopIndex from "./Pages/Shop/Index";
import Login from "./Pages/Auth/Login";
import ProductDetail from "./Pages/Shop/ProductDetail";
import DashboardMain from "./Pages/Dashboard";
import IndexBooks from "./Pages/Books/IndexBooks";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import IndexBookImage from "./Pages/BookImage/IndexBookImage";
import Signup from "./Pages/Auth/Signup";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { DropdownProvider } from "./DropdownProvider/DropdownProvider";
import IndexBooksForSale from "./Pages/BooksForSale/IndexBooksForSale";
import IndexProfile from "./Pages/Profile/IndexProfile";
import IndexUserCreditTransactions from "./Pages/UserCreditTransactions/IndexUserCreditTransactions";
import AllUsersTransactions from "./Pages/Admin/AllUsersTransactions";
import IndexBooksSubjects from "./Pages/BookSubjects/IndexBooksSubjects";
import IndexOrders from "./Pages/Orders/IndexOrders";
import NoPermission from "./Components/NoPermission/NoPermission";
import IndexUsers from "./Pages/Users/IndexUsers";

function App() {
  return (
    <>
      <DropdownProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={<LayoutIndex />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="home" element={<LandingIndex />} />
              <Route path="shop" element={<ShopIndex />} />
              <Route path="product-detail/:id" element={<ProductDetail />} />

              <Route
                path="dashboard/*"
                element={
                  <ProtectedRoutes>
                    <DashboardMain />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="books" element={<IndexBooks />} />
                <Route path="book-image" element={<IndexBookImage />} />
                <Route path="books-for-sale" element={<IndexBooksForSale />} />
                <Route path="books-subjects" element={<IndexBooksSubjects />} />
                <Route path="books-orders" element={<IndexOrders />} />

                <Route
                  path="user-transactions"
                  element={<IndexUserCreditTransactions />}
                />
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
