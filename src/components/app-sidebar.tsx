"use client"
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail } from './ui/sidebar'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'
import AppSidebarRouteGroup from './app-sidebar-route-group'
import { AudioLines, LucideIcon, LucideProps, SpeakerIcon } from 'lucide-react'
export type menuItems= {
    title: string;
    url: string;
    icon: LucideIcon
}
  const mainMenuItems= [
    {
      title: "Explore voices",
      url: "/voices",
      icon: SpeakerIcon,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLines,
    },

  ];

const AppSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
        <SidebarRail/>
         <SidebarHeader>
            <SidebarGroup>
                <SidebarGroupContent >
                        <SidebarMenu>
            <SidebarMenuItem>
              <OrganizationSwitcher
              
              afterSelectOrganizationUrl={'/voices?change=true'}
                hidePersonal
                fallback={
                  <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-white" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    organizationSwitcherTrigger:
                      "w-full! justify-between! bg-transparent! rounded-md! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-none!",
                    organizationPreview: "gap-2!",
                    organizationPreviewAvatarBox: "size-6! rounded-sm!",
                    organizationPreviewTextContainer:
                      "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                    organizationPreviewMainIdentifier: "text-[13px]!",
                    organizationSwitcherTriggerIcon:
                      "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
         </SidebarHeader>
         <SidebarContent>
            <AppSidebarRouteGroup items={mainMenuItems} title='General'/>
         </SidebarContent>
         <SidebarFooter>
              <SidebarMenu>
            <SidebarMenuItem>
              <UserButton
                showName
                fallback={
                  <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-white" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    userButtonTrigger:
                      "w-full! justify-between! bg-transparent! rounded-md! pl-1! pr-2! py-1! shadow-none! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                    userButtonBox: "flex-row-reverse! gap-2!",
                    userButtonOuterIdentifier:
                      "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                    userButtonAvatarBox: "size-6!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
         </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar