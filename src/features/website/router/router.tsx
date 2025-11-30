import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../../App";
import WebsiteLayout from "../components/layout/WebsiteLayout";
import AboutPage from "../pages/About/About";
import ContactPage from "../pages/Contact/ContactPage";

// Lazy Loading Pages
import Home from "../pages/Home/Home";
const Products = lazy(() => import("../pages/Products/Products"));

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
            element: <AboutPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "products/:categoryId",
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <Products />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
