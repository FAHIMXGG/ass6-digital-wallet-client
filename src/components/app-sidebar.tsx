import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
// import Logo from "@/assets/icons/Logo";
import { Link, useLocation } from "react-router";
// import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Home } from "lucide-react";
import { GuidedTour } from "@/components/GuidedTour";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const location = useLocation();

  // const data = {
  //   navMain: getSidebarItems(userData?.data?.role),
  // };

  const data = {
    navMain: getSidebarItems(userData?.data?.role)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3" data-tour="sidebar-header">
          <Link to="/" className="flex items-center space-x-2">
            {/* <Logo /> */}
            <span className="font-semibold text-foreground">Wallet</span>
          </Link>
          <ModeToggle data-tour="settings-toggle" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Home Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={location.pathname === "/" ? "bg-accent text-accent-foreground" : ""}>
                  <Link to="/" className="flex items-center space-x-2" data-tour="home-link">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location.pathname === item.url;
                  // Add tour data attributes based on item title
                  const getTourAttribute = (title: string) => {
                    const lowerTitle = title.toLowerCase();
                    // More specific matching for better tour coverage
                    if (lowerTitle.includes('wallet')) return 'wallet-section';
                    if (lowerTitle.includes('transaction') || lowerTitle.includes('history')) return 'transactions-section';
                    if (lowerTitle.includes('update profile') || lowerTitle.includes('update user')) return 'user-management';
                    if (lowerTitle.includes('overview')) return 'analytics-section';
                    if (lowerTitle.includes('settings')) return 'settings-section';
                    if (lowerTitle.includes('send') || lowerTitle.includes('withdraw')) return 'transactions-section';
                    return null;
                  };
                  
                  const tourAttribute = getTourAttribute(item.title);
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className={isActive ? "bg-accent text-accent-foreground" : ""}>
                        <Link to={item.url} {...(tourAttribute && { 'data-tour': tourAttribute })}>
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <GuidedTour />
    </Sidebar>
  );
}