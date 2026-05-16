"use client"
import * as React from "react"
import Image from "next/image"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    LogOut,
    User,
    LayoutDashboard,
    Sparkles
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"

// This is sample data.
const data = {
    user: {
        name: "Admin",
        email: "admin@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Carena",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/admin",
                },
                {
                    title: "Team Members",
                    url: "/admin/team",
                },
                {
                    title: "Gallery",
                    url: "/admin/gallery",
                },
                {
                    title: "Settings",
                    url: "/admin/settings",
                },
                {
                    title: "Features",
                    url: "/admin/features",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, logout } = useAuth();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-none bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                                    <Image src="/asset/Carena_server.png" alt="Logo" width={32} height={32} className="object-cover" style={{ imageRendering: 'pixelated' }} />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Carena</span>
                                    <span className="truncate text-xs">Admin Panel</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <React.Fragment key={item.title}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                    {item.items?.length ? (
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    ) : null}
                                </SidebarMenuItem>
                            </React.Fragment>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Back to Website">
                            <a href="/">
                                <Frame className="size-4" />
                                <span>Back to Website</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={data.user.avatar} alt={user?.name || "Admin"} />
                                        <AvatarFallback className="rounded-lg">{user?.name?.slice(0, 2).toUpperCase() || "AD"}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.name || "Admin"}</span>
                                        <span className="truncate text-xs">{user?.email || "admin@example.com"}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={data.user.avatar} alt={user?.name} />
                                            <AvatarFallback className="rounded-lg">{user?.name?.slice(0, 2).toUpperCase() || "AD"}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user?.name || "Admin"}</span>
                                            <span className="truncate text-xs">{user?.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
