import AllWallets from "@/pages/admin/AllWallets";
import AllUser from "@/pages/admin/AllUser";
import Overview from "@/pages/admin/Overview";
import MyWallet from "@/pages/MyWallet";
import type { ISidebarItem } from "@/types";
import AgentBlockUnblock from "@/pages/admin/AgentBlockUnblock";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: MyWallet,
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
        title: "All Wallets",
        url: "/admin/all-wallets",
        component: AllWallets,
      },
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUser,
      },
      {
        title: "Agent Block/Unblock",
        url: "/admin/agent-block-unblock",
        component: AgentBlockUnblock,
      },
    ],
  }
];