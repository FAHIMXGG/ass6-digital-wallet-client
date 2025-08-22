import Overview from "@/pages/admin/Overview";
import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import AgentOverview from "@/pages/agent/AgentOverview";
import MyHistory from "@/pages/MyHistory";
import UpdateUser from "@/pages/UpdateUser";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: AgentOverview,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        component: CashIn,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        component: CashOut,
      },
      {
        title: "My History",
        url: "/agent/my-history",
        component: MyHistory,
      },
      {
        title: "Update User",
        url: "/agent/update-user",
        component: UpdateUser,
      },
    ],
  }
];