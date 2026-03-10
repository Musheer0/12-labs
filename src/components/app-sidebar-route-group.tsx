"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import type { menuItems } from "./app-sidebar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

interface props {
  title: string;
  items: menuItems[];
}
const AppSidebarRouteGroup: React.FC<props> = ({ title, items }) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild={!!item.url}
              isActive={
                item.url
                  ? item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url)
                  : false
              }
              tooltip={item.title}
              className="h-9 px-3 py-2 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:bg-accent-foreground/10"
            >
              {item.url ? (
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              ) : (
                <>
                  <item.icon />
                  <span>{item.title}</span>
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AppSidebarRouteGroup;
