import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../Layout/MainLayout"
import PrivateRoute from "./PrivateRoute"; 
import Home from "../pages/Home";
import Product from "../pages/Product";
import User from "../pages/User";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/",
    element: <PrivateRoute />, 
    children: [
      {
        element: <Layout />, 
        children: [
          {
            index: true,
            element: <Dashboard />, 
          },
          {
            path:"/home",
            element:<Home></Home>
          },
          {
            path:"/product",
            element:<Product></Product>
          },
          {
            path:"/user",
            element:<User></User>
          }
        ],
      },
    ],
  },
]);

export default router;
