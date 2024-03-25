import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import { AuthGuard } from "components/auth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";

const Units = Loadable(lazy(() => import("pages/dashboard/Units")));
const Categories = Loadable(lazy(() => import("pages/dashboard/Categories")));
const Products = Loadable(lazy(() => import("pages/dashboard/Products")));

export const DashboardRoutes = [
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        // index: true,
        path: "units",
        element: <Units />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
];
