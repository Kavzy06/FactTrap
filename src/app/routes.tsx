import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { AnalysisPage } from "./pages/analysis-page";
import { DashboardPage } from "./pages/dashboard-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/analysis/:id",
    Component: AnalysisPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
]);
