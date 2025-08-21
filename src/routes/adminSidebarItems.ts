import Overview from "@/pages/admin/Overview";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
      },
      {
        title: "ggg",
        url: "/admin/overview",
        component: Overview,
      },
    ],
  }
];