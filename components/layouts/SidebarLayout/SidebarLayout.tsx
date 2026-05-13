"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ISession } from "@/types/user";

export default function SidebarLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: ISession;
}) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full min-h-screen p-5">
        <div className="w-full flex justify-between">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
