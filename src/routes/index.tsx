import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AgentOverview from "@/pages/agent/AgentOverview";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Contact,
        path: "contact",
      },
    
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      ...generateRoutes(adminSidebarItems)
    ],
  },
  {
    Component: DashboardLayout,
    path: "/agent",
    children: [
      {
        Component: AgentOverview,
        path: "overview",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      ...generateRoutes(userSidebarItems)
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  }
]);