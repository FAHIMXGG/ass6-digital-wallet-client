import MyHistory from "@/pages/MyHistory";
import MyWallet from "@/pages/MyWallet";
import UpdateUser from "@/pages/UpdateUser";
import SendMoney from "@/pages/user/SendMoney";
import Withdraw from "@/pages/user/Withdraw";
import UserOverview from "@/pages/user/UserOverview";
import Settings from "@/pages/Settings";

export const userSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "My Wallet",
        url: "/user/wallet",
        component: MyWallet,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney,
      },
      {
        title: "Withdraw",
        url: "/user/withdraw",
        component: Withdraw,
      },
      {
        title: "My History",
        url: "/user/my-history",
        component: MyHistory,
      },
      {
        title: "Update Profile",
        url: "/user/update-profile",
        component: UpdateUser,
      },
      {
        title: "Settings",
        url: "/user/settings",
        component: Settings,
      },
    ],
  }
];