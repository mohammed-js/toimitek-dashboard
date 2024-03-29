import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import { AuthGuard } from "components/auth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";

const Units = Loadable(lazy(() => import("pages/dashboard/Units")));
const Categories = Loadable(lazy(() => import("pages/dashboard/Categories")));
const Products = Loadable(lazy(() => import("pages/dashboard/Products")));
const Services = Loadable(lazy(() => import("pages/dashboard/Services")));
const Items = Loadable(lazy(() => import("pages/dashboard/Items")));

export const DashboardRoutes = [
  {
    path: "",
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
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "items",
        element: <Items />,
      },
    ],
  },
];
