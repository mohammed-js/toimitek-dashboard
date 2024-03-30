import { lazy } from "react";
import Loadable from "./Loadable";
import { DashboardRoutes } from "./dashboard";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import ForgetPassword from "pages/ForgetPassword";
// GLOBAL ERROR PAGE
const ErrorPage = Loadable(lazy(() => import("pages/404")));
// LANDING / INITIAL PAGE
export const routes = () => {
  return [
    // GLOBAL ERROR PAGE
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    // INSIDE DASHBOARD PAGES ROUTES
    ...DashboardRoutes,
  ];
};
