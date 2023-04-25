import jwt_decode from "jwt-decode";
import { useEffect, useState} from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./Pages/LoginSignup/Login/Login-Form";
import AdminDashboard from "./UI/Admin-UI/AdminPage/dashboard/dashboard";
import NotFound from "./Pages/NotFound/notfound";
// import Navbar from "./Components/Navbar/navbar";
import AdminPage from "./UI/Admin-UI/AdminPage/admin_page";
import { userLogout } from "./redux/apiCalls";
import Blog from "./UI/Admin-UI/Blog/Blog";
import ManageClients from "./UI/manageClients/ManageClients";
import ManageModels from "./UI/manageModels/ManageModels";
import ManageAgency from "./UI/manageAgency/ManageAgency";
import Users from "./UI/users/Users";
import AddUser from "./UI/users/AddUser";
import Subscription from "./UI/subscriptions/Subscription";
import EditModel from "./UI/edit/EditModel";
import EditAgency from "./UI/edit/EditAgency";
import EditClient from "./UI/edit/EditClient";


const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // automatically logout a user when session expires
  const handleLogout = () => {
    userLogout(dispatch);
    userLogout(dispatch);
  };

  useEffect(() => {
    if (user) {
      const token = user.accessToken;
      if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          handleLogout();
          return alert("Session expired! kindly login again to continue");
        }
      }
    }
  });

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" />;
    }

    return children;
  };

  const Layout = () => {
    return (
      <div className="app">
        {/* {showNavbar && <Navbar />} */}
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: !user ? <LoginForm /> : <Navigate to="/adminpage" />,
        },
        {
          path: "adminpage/",
          element: (
            <ProtectedRoute>
              <AdminPage
                showNavbar={showNavbar}
                setShowNavbar={setShowNavbar}
              />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "posts",
              element: <Blog />,
            },
            {
              path: "manage_clients",
              element: <ManageClients />,
            },
            {
              path: "manage_models",
              element: <ManageModels />,
            },
            {
              path: "manage_agency",
              element: <ManageAgency />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "users/add_user",
              element: <AddUser />,
            },
            {
              path: "subscription",
              element: <Subscription />,
            },
            {
              path: "manage_models/:id",
              element: <EditModel />,
            },
            {
              path: "manage_clients/:id",
              element: <EditClient />,
            },
            {
              path: "manage_agency/:id",
              element: <EditAgency />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
