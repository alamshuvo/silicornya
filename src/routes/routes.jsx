
import { createBrowserRouter } from "react-router";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    // errorElement:<div className="flex items-center justify-center h-screen"></div>,
    // children: [
    //   {
    //     index: true,
    //     element: <App></App>,
    //   },
    // ],
  },
//   {
//     path: "/",
//     element: <App></App>,
//   },
]);

export default router;