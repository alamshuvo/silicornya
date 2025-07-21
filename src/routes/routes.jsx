import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../Layout/MainLayout";
import PrivateRoute from "./PrivateRoute"; // import the wrapper

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // public login page
  },
  {
    path: "/",
    element: <PrivateRoute />, // this checks for token
    children: [
      {
        element: <Layout />, // layout with navbar & sidebar
        children: [
          {
            index: true,
            element: <Dashboard />, // dashboard will now be protected
          },
        ],
      },
    ],
  },
]);

export default router;
