import type React from "react";
import AppSidebar from "@/components/app-sidebar";
import ProtectedComponent from "@/components/protected-components";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedComponent>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ProtectedComponent>
  );
};

export default Layout;
