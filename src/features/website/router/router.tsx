import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../../App";
import  WebsiteLayout  from "../components/layout/WebsiteLayout";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/ar" replace />,
  },
  {
    path: "/:lang",
    element: <App />,
    children: [
      {
        element: <WebsiteLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <div>abit</div>,
          },
          {
            path: "contact",
            element: <div>contact</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
