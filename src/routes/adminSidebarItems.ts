import AllWallets from "@/pages/admin/AllWallets";
import AllUser from "@/pages/admin/AllUser";
import Overview from "@/pages/admin/Overview";
import MyWallet from "@/pages/MyWallet";
import type { ISidebarItem } from "@/types";
import AgentBlockUnblock from "@/pages/admin/AgentBlockUnblock";
import AllTransaction from "@/pages/admin/AllTransaction";
import UpdateUser from "@/pages/UpdateUser";

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
      {
        title: "All Transaction",
        url: "/admin/all-transaction",
        component: AllTransaction,
      },
      {
        title: "Update User",
        url: "/admin/update-user",
        component: UpdateUser,
      },
    ],
  }
];