"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import useDialogState from "@/hooks/use-dialog-state";
import { FaHospitalSymbol } from "react-icons/fa";
import { LuChevronsUpDown } from "react-icons/lu";
import SIDEBAR_ADMIN from "./constant/SidebarAdmin.constant";
import SIDEBAR_KASIR from "./constant/SidebarKasir.constant";
import { ISession } from "@/types/user";
import Image from "next/image";
import { SignOutDialog } from "./SignOutDialog";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar({ user }: { user: ISession }) {
  const { setOpenMobile, isMobile, state } = useSidebar();
  const [open, setOpen] = useDialogState();

  const pathname = usePathname();

  const sidebar = user.user.role === "admin" ? SIDEBAR_ADMIN : SIDEBAR_KASIR;

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
        {sidebar.map((items) => (
          <SidebarGroup key={items.title}>
            <SidebarMenu className="gap-y-3">
              {items.items.map((item: any) => {
                const key = `${item.title}-${item.url}`;

                if (!item.items)
                  return (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link
                          href={item.url}
                          onClick={() => setOpenMobile(false)}
                        >
                          {item.icon && <item.icon />}
                          <span className={cn(isMobile && "text-[1rem]")}>{item.title}</span>
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
                  <Image
                    src={user.user.image || ""}
                    alt={`profile-${user.user.name}`}
                    className="w-8 h-8 rounded-full border-2"
                    width={300}
                    height={300}
                  />
                  {/* name */}
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.user.name}
                    </span>
                    <span className="truncate text-xs">{user.user.email}</span>
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
                    <Image
                      src={user.user.image || ""}
                      alt={`profile-${user.user.name}`}
                      className="w-8 h-8 rounded-full border-2"
                      width={300}
                      height={300}
                    />
                    {/* name */}
                    <div className="grid flex-1 text-start text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {user.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild className="p-2">
                    <Link href="/">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-2">
                    <Link href="/">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="p-2"
                  onClick={() => setOpen(true)}
                >
                  {/* <FaLogOut /> */}
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <SignOutDialog open={!!open} onOpenChange={setOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
