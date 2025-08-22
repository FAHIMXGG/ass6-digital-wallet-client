import MyHistory from "@/pages/MyHistory";
import MyWallet from "@/pages/MyWallet";
import SendMoney from "@/pages/user/SendMoney";
import Withdraw from "@/pages/user/Withdraw";

export const userSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: MyWallet,
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
      
    ],
  }
];