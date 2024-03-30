import { useMediaQuery } from "@mui/material";
// CUSTOM COMPONENTS
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import LayoutBodyWrapper from "../layout-parts/LayoutBodyWrapper";
// DASHBOARD LAYOUT BASED CONTEXT PROVIDER
import LayoutProvider from "./context/layoutContext";
import { Navigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  var currentUrl = window.location.pathname;
  const isIndex = currentUrl === "/" || currentUrl === "";
  const isLogged = localStorage.getItem("toimitek_token") ? true : false;

  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <LayoutProvider>
      {isIndex && <Navigate to="/units" replace={true} />}
      {!isLogged && <Navigate to="/login" replace={true} />}
      {/* CONDITIONALLY RENDER THE SIDEBAR */}
      {downLg ? <MobileSidebar /> : <DashboardSidebar />}
      <LayoutBodyWrapper>
        {/* DASHBOARD HEADER SECTION */}
        <DashboardHeader />

        {/* MAIN CONTENT RENDER SECTION */}
        {children}
      </LayoutBodyWrapper>
    </LayoutProvider>
  );
};
export default DashboardLayout;
