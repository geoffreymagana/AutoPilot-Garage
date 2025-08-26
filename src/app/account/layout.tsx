
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  LayoutGrid,
  Car,
  ClipboardList,
  Calendar,
  Settings,
  PanelLeft,
  Wallet,
  Star,
  LogOut,
  User,
  PlusCircle
} from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  useTheme("theme:account", "dark"); // Initialize theme for account section

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarRail />
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-7 text-primary animate-spin-slow" />
            <span className="text-lg font-semibold font-headline">AutoPilot</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/account"
                asChild
                isActive={isActive("/account")}
                tooltip="Dashboard"
              >
                <Link href="/account">
                  <LayoutGrid />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/account/vehicles"
                asChild
                isActive={isActive("/account/vehicles")}
                tooltip="My Vehicles"
              >
                <Link href="/account/vehicles">
                  <Car />
                  <span>My Vehicles</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/account/service-history" asChild tooltip="Service History" isActive={pathname.startsWith('/account/service-history')}>
                <Link href="/account/service-history">
                  <ClipboardList />
                  <span>Service History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/account/booking" asChild tooltip="Book Appointment" isActive={isActive('/account/booking')}>
                <Link href="/account/booking">
                  <Calendar />
                  <span>Book Appointment</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/account/payments" asChild tooltip="Payments" isActive={isActive('/account/payments')}>
                <Link href="/account/payments">
                  <Wallet />
                  <span>Payments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/account/loyalty" asChild tooltip="Loyalty Program" isActive={isActive('/account/loyalty')}>
                <Link href="/account/loyalty">
                  <Star />
                  <span>Loyalty Program</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {isMobile && (
                 <SidebarMenuItem>
                    <SidebarMenuButton href="/account/booking" asChild>
                        <Link href="/account/booking">
                            <PlusCircle />
                            <span>Book a Service</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton href="/account/settings" asChild tooltip="Settings" isActive={isActive('/account/settings')}>
                <Link href="/account/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/account/profile" asChild tooltip="Profile" isActive={isActive('/account/profile')}>
                <Link href="/account/profile">
                  <Avatar className="size-7">
                    <AvatarImage src="https://i.pravatar.cc/150?u=demo" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <span>Demo User</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" asChild tooltip="Logout">
                <Link href="/">
                    <LogOut />
                    <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-8">
          <SidebarTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="size-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SidebarTrigger>
          <h1 className="flex-1 text-xl font-semibold capitalize font-headline">
            {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
          </h1>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/account/booking">Book a Service</Link>
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
