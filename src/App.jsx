import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from "@mui/material";
import { Navigate } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// AUTH CONTEXT FILE
import { AuthProvider } from "contexts/firebaseContext";
// RIGHT-TO-LEFT SUPPORT COMPONENT
import { RTL } from "components/rtl";
// ROUTES METHOD
import { routes } from "./routes";
// MUI THEME CREATION METHOD
import { createCustomTheme } from "./theme";
// SITE SETTINGS CUSTOM DEFINED HOOK
import useSettings from "hooks/useSettings";
// TOAST
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// I18N FILE
import "./i18n";
import "./App.css";
import { useTranslation } from "react-i18next";

const App = () => {
  // -------
  const { t } = useTranslation();
  console.log("xxxxxxxxxxxx", t("test1.0"));
  console.log("xxxxxxxxxxxx", t("test2.key"));
  // -------
  const { settings } = useSettings();
  const theme = createCustomTheme(settings);
  // ROUTER CREATE
  const router = createBrowserRouter(routes());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <RTL>
              <CssBaseline />
              <RouterProvider router={router} />
            </RTL>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
      <ToastContainer />
    </LocalizationProvider>
  );
};
export default App;
