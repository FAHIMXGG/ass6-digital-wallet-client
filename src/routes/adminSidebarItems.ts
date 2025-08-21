import AllWallets from "@/pages/admin/AllWallets";
import Overview from "@/pages/admin/Overview";
import MyWallet from "@/pages/MyWallet";
import type { ISidebarItem } from "@/types";

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
      
    ],
  }
];