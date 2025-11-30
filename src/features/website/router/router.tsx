import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../../App";
import WebsiteLayout from "../components/layout/WebsiteLayout";

// Lazy Loading Pages
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Products/Products"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/ar" replace />,
  },
  {
    path: "/:lang",
    element: (
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <WebsiteLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense
                fallback={<div className="text-center">Loading...</div>}
              >
                <Home />
              </Suspense>
            ),
          },
          {
            path: "about",
            element: <div>about</div>,
          },
          {
            path: "contact",
            element: <div>contact</div>,
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
