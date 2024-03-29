import { lazy } from "react";
import Loadable from "./Loadable";
import { AuthRoutes } from "./auth";
import { DashboardRoutes } from "./dashboard";
// GLOBAL ERROR PAGE
const ErrorPage = Loadable(lazy(() => import("pages/404")));
// LANDING / INITIAL PAGE
export const routes = () => {
  return [
    // GLOBAL ERROR PAGE
    {
      path: "*",
      element: <ErrorPage />,
    },
    // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
    ...AuthRoutes,
    // INSIDE DASHBOARD PAGES ROUTES
    ...DashboardRoutes,
  ];
};
