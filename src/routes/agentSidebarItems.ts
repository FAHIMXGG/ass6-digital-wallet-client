import Overview from "@/pages/admin/Overview";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: Overview,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: Overview,
      },
      {
        title: "agent overview",
        url: "/agent/overview",
        component: Overview,
      },
    ],
  }
];