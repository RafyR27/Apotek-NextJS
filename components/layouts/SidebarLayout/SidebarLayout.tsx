"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen p-4">
        <div className="w-full flex justify-between">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
