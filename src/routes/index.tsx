import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { Navigate } from "react-router";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import { agentSidebarItems } from "./agentSidebarItems";
import About from "@/pages/About";
import Features from "@/pages/Features";
import FAQ from "@/pages/FAQ";
import Home from "@/pages/Home";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: Home,
        path: "/",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      {index: true, element: <Navigate to="/admin/overview" />},
      ...generateRoutes(adminSidebarItems)
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      {index: true, element: <Navigate to="/agent/overview" />},
      ...generateRoutes(agentSidebarItems)
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      {index: true, element: <Navigate to="/user/overview" />},
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
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  }
]);