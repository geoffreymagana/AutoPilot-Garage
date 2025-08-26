
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  ClipboardCheck,
  Bot,
  Camera,
  FileText,
  Calendar,
  Users,
  Boxes,
  PieChart,
  Settings,
  PanelLeft,
  LogOut,
  User,
} from "lucide-react";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  useTheme("theme:admin", "dark"); // Initialize theme for admin section

  if (pathname === '/dashboard/login') {
    return <main className="flex-1">{children}</main>;
  }

  const isActive = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path);
  }

  const handleLogout = () => {
    router.push('/dashboard/login');
  };

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) return "Dashboard";
    const title = segments[segments.length - 1].replace(/-/g, " ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  }


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
                href="/dashboard"
                asChild
                isActive={isActive("/dashboard", true)}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutGrid />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/dashboard/work-orders"
                asChild
                isActive={isActive("/dashboard/work-orders")}
                tooltip="Work Orders"
              >
                <Link href="/dashboard/work-orders">
                  <ClipboardCheck />
                  <span>Work Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/appointments" asChild tooltip="Appointments" isActive={isActive('/dashboard/appointments')}>
                <Link href="/dashboard/appointments">
                  <Calendar />
                  <span>Appointments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/customers" asChild tooltip="Customers" isActive={isActive('/dashboard/customers')}>
                <Link href="/dashboard/customers">
                  <Users />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/inventory" asChild tooltip="Inventory" isActive={isActive('/dashboard/inventory')}>
                <Link href="/dashboard/inventory">
                  <Boxes />
                  <span>Inventory</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/reports" asChild tooltip="Reports" isActive={isActive('/dashboard/reports')}>
                <Link href="/dashboard/reports">
                  <PieChart />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Bot />
                <span>AI Tools</span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive("/dashboard/ai-tools/photo-analysis")}>
                    <Link href="/dashboard/ai-tools/photo-analysis">
                      <Camera /> Photo Analysis
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                   <SidebarMenuSubButton asChild isActive={isActive("/dashboard/ai-tools/report-generation")}>
                    <Link href="/dashboard/ai-tools/report-generation">
                      <FileText /> Report Generation
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/settings" asChild tooltip="Settings" isActive={isActive('/dashboard/settings')}>
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/profile" asChild tooltip="Profile" isActive={isActive('/dashboard/profile')}>
                <Link href="/dashboard/profile">
                  <Avatar className="size-7">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704c" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <span>Mike L.</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
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
            {getPageTitle()}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
