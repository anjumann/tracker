"use client"

import * as React from "react"
import Link from "next/link"
import { HomeIcon, LayoutDashboardIcon, ListIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { getListsForUser } from "@/constant"

export function MainSidebar({ children }: { children: React.ReactNode }) {
  const lists =  getListsForUser()
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2">
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Home">
                  <Link href="/">
                    <HomeIcon className="mr-2" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/analytics"} tooltip="Analytics">
                  <Link href="/analytics">
                    <LayoutDashboardIcon className="mr-2" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {/* List of Lists */}
            <div className="mt-6">
              <div className="flex items-center gap-2 px-4 mb-2 text-muted-foreground text-xs uppercase tracking-wider">
                <ListIcon className="h-4 w-4" />
                Your Lists
              </div>
              <ul className="space-y-1 px-2">
                {lists.length > 0 ? (
                  lists.map((list) => {
                    const listPath = `/lists/${list.id}`;
                    const isActive = pathname === listPath;
                    return (
                      <li key={list.id}>
                        <Link
                          href={listPath}
                          className={cn(
                            "flex items-center justify-between py-2 px-3 hover:bg-muted rounded-md transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary",
                            isActive && "bg-muted"
                          )}
                          aria-label={`Go to list ${list.title}`}
                        >
                          <span className="truncate">{list.title}</span>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-xs text-muted-foreground px-3 py-2">No lists available</li>
                )}
              </ul>
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border mt-auto">
            <div className="flex items-center gap-3 p-4">
              <Avatar>
                <AvatarImage src="/images/avatar.png" alt="User" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">User Name</span>
                <span className="text-xs text-muted-foreground truncate">user@example.com</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="h-full w-full overflow-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 