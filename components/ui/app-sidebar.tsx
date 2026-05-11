/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

import {
  FaUsers,
  FaTasks,
  FaCog,
  FaBell,
  FaPalette,
  FaWrench,
  FaShieldAlt,
  FaBug,
  FaLock,
  FaUserSlash,
  FaFileAlt,
  FaTools,
  FaQuestionCircle,
  FaHospitalSymbol,
} from "react-icons/fa";

import { MdDashboard, MdApps, MdChat, MdMonitor } from "react-icons/md";

import { IoLogIn } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { LuChevronsUpDown } from "react-icons/lu";
import useDialogState from "@/hooks/use-dialog-state";

const sidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: MdDashboard,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: FaTasks,
        },
        {
          title: "Apps",
          url: "/apps",
          icon: MdApps,
        },
        {
          title: "Chats",
          url: "/chats",
          icon: MdChat,
        },
        {
          title: "Users",
          url: "/users",
          icon: FaUsers,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const { setOpenMobile, isMobile, state } = useSidebar();
  const [open, setOpen] = useDialogState();

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="p-2">
      <SidebarRail />
      <SidebarHeader>
        {/* header */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-0 py-0 hover:bg-transparent active:bg-transparent "
              asChild
            >
              <div>
                <Link href={"/"} className="flex  items-center gap-2">
                  <FaHospitalSymbol className="text-tertiary w-8! h-8! shrink-0 text-center" />
                  {state !== "collapsed" && (
                    <p className="text-primary font-heading text-start font-bold text-[1.2rem]">
                      ApotekKart
                    </p>
                  )}
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* conttent */}
        {sidebarData.navGroups.map((items) => (
          <SidebarGroup key={items.title}>
            <SidebarMenu className="gap-y-3">
              {items.items.map((item: any) => {
                const key = `${item.title}-${item.url}`;

                if (!item.items)
                  return (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          onClick={() => setOpenMobile(false)}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {/* footer */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {/* avatar */}

                  {/* name */}
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">Budi</span>
                    <span className="truncate text-xs">Email</span>
                  </div>
                  <LuChevronsUpDown className="ms-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                    {/* avatar */}

                    {/* name */}
                    <div className="grid flex-1 text-start text-sm leading-tight">
                      <span className="truncate font-semibold">Budi</span>
                      <span className="truncate text-xs">Email</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>{/* menu */}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>{/* menu */}</DropdownMenuItem>
                  <DropdownMenuItem asChild>{/* menu */}</DropdownMenuItem>
                  <DropdownMenuItem asChild>{/* menu */}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  //   onClick={() => setOpen(true)}
                >
                  {/* <FaLogOut /> */}
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* <SignOutDialog open={!!open} onOpenChange={setOpen} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
