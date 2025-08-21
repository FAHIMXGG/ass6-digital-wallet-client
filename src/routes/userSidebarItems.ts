import UserOverview from "@/pages/user/UserOverview";

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
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
      {
        title: "User Overview",
        url: "/user/overview",
        component: UserOverview,
      },
      
    ],
  }
];