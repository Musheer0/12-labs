import AppSidebar from "@/components/app-sidebar";
import ProtectedComponent from "@/components/protected-components";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>
 <ProtectedComponent>
  <TooltipProvider>
     <SidebarProvider>
      <AppSidebar/>
    <SidebarInset>
      {children}
    </SidebarInset>
  </SidebarProvider>
  </TooltipProvider>
 </ProtectedComponent>
  </>;
};

export default Layout;
