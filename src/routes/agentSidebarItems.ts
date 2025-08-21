import Overview from "@/pages/admin/Overview";
import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import MyWallet from "@/pages/MyWallet";
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        component: MyWallet,
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
        title: "agent overview",
        url: "/agent/overview",
        component: Overview,
      },
    ],
  }
];