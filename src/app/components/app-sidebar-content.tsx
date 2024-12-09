"use client";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/app/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  LogOut,
  LayoutDashboard,
  CalendarDays,
  UserCheck,
  User,
  Moon,
  Sun,
  ChevronDown,
  UserPen,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const applicationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Patient Records",
    url: "/patient-records",
    icon: UserCheck,
  },
];

const adminItems = [
  {
    title: "Staff Management",
    url: "/staff",
    icon: UserPen,
  },
];

const settingsItems = [
  { title: "Update Profile", url: "/update/profile", icon: User },
  { title: "Update Password", url: "/update/password", icon: Lock },
];

export function AppSidebarContent({ session }: { session: Session }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const { setTheme } = useTheme();

  const onLogOut = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging you out...", {
      description: "You will be logged out in a moment.",
    });
    await signOut();
    setIsLoggingOut(false);
    toast.dismiss(toastId);
  };
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {applicationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {session.user.role === 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Administrator</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === pathname}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === pathname}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      Theme
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="my-2 flex select-none items-center gap-4">
          <Avatar>
            <AvatarImage src={session.user.image ?? ""} />
            <AvatarFallback className="bg-green-500 text-white">
              {session.user.username.charAt(0).toUpperCase() ?? "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold">{session.user.email}</span>
            <span className="text-xs text-muted-foreground">
              Welcome to Smile Factory!
            </span>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={onLogOut}
          disabled={isLoggingOut}
        >
          <LogOut /> Log out
        </Button>
      </SidebarFooter>
    </>
  );
}
