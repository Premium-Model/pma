import jwt_decode from "jwt-decode";
import { Suspense, lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./redux/apiCalls";
import Single from "./UI/Admin-UI/Blog/Single";
import Spinner from "./ATOMIC/atoms/spinner/Spinner";
import GenerateInvoice from "./UI/subscriptions/GenerateInvoice";
import JobNotice from "./UI/Notification/Job-Notice-Items";
import Offers from "./UI/Admin-UI/AdminPage/Ambassador/offers";
const LoginForm = lazy(() => import("./Pages/LoginSignup/Login/Login-Form"));
const AdminDashboard = lazy(() => import("./UI/Admin-UI/AdminPage/dashboard/dashboard"));
const NotFound = lazy(() => import("./Pages/NotFound/notfound"));
// import Navbar from "./Components/Navbar/navbar";
const AdminPage = lazy(() => import("./UI/Admin-UI/AdminPage/admin_page"));
const Blogs = lazy(() => import("./UI/Admin-UI/Blog/Blogs"));
const ManageClients = lazy(() => import("./UI/manageClients/ManageClients"));
const ManageModels = lazy(() => import("./UI/manageModels/ManageModels"));
const ManageAgency = lazy(() => import("./UI/manageAgency/ManageAgency"));
const Users = lazy(() => import("./UI/users/Users"));
const AddUser = lazy(() => import("./UI/users/AddUser"));
const Subscription = lazy(() => import("./UI/subscriptions/Subscription"));
const EditModel = lazy(() => import("./UI/edit/EditModel"));
const EditAgency = lazy(() => import("./UI/edit/EditAgency"));
const EditClient = lazy(() => import("./UI/edit/EditClient"));

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [isWrite, setIsWrite] = useState(false);

  // automatically logout a user when session expires
  const handleLogout = () => {
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
      errorElement: (
        <Suspense fallback={<Spinner />}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: !user ? (
            <Suspense fallback={<Spinner />}>
              <LoginForm />
            </Suspense>
          ) : (
            <Navigate to="/adminpage" />
          ),
        },
        {
          path: "adminpage/",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Spinner />}>
                <AdminPage showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
              </Suspense>
            </ProtectedRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<Spinner />}>
                  <AdminDashboard />
                </Suspense>
              ),
            },
            {
              path: "posts",
              element: (
                <Suspense fallback={<Spinner />}>
                  <Blogs setIsWrite={setIsWrite} isWrite={isWrite} />
                </Suspense>
              ),
            },
            {
              path: "post/:id",
              element: (
                <Suspense fallback={<Spinner />}>
                  <Single isWrite={isWrite} setIsWrite={setIsWrite} />
                </Suspense>
              ),
            },
            {
              path: "manage_clients",
              element: (
                <Suspense fallback={<Spinner />}>
                  <ManageClients />
                </Suspense>
              ),
            },
            {
              path: "manage_models",
              element: (
                <Suspense fallback={<Spinner />}>
                  <ManageModels />
                </Suspense>
              ),
            },
            {
              path: "manage_agency",
              element: (
                <Suspense fallback={<Spinner />}>
                  <ManageAgency />
                </Suspense>
              ),
            },
            {
              path: "users",
              element: (
                <Suspense fallback={<Spinner />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: "users/add_user",
              element: (
                <Suspense fallback={<Spinner />}>
                  <AddUser />
                </Suspense>
              ),
            },
            {
              path: "subscription",
              element: (
                <Suspense fallback={<Spinner />}>
                  <Subscription />
                </Suspense>
              ),
            },
            {
              path: "add-subscription/:id",
              element: (
                <Suspense fallback={<Spinner />}>
                  <GenerateInvoice />
                </Suspense>
              ),
            },
            {
              path: "manage_models/:id",
              element: (
                <Suspense fallback={<Spinner />}>
                  <EditModel />
                </Suspense>
              ),
            },
            {
              path: "manage_clients/:id",
              element: (
                <Suspense fallback={<Spinner />}>
                  <EditClient />
                </Suspense>
              ),
            },
            {
              path: "manage_agency/:id",
              element: (
                <Suspense fallback={<Spinner />}>
                  <EditAgency />
                </Suspense>
              ),
            },
            {
              path: "notification/:id",
              element: <JobNotice />,
            },
            {
              path: "offers",
              element: <Offers />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
