import SidebarLayout from "@/components/layouts/SidebarLayout/SidebarLayout";
import AdminDashboard from "@/components/views/Admin/Dashboard/AdminDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  if (session.user.role === "user") redirect("/products");
  if (session.user.role === "kasir") redirect("/kasir/dashboard");

  return (
    <SidebarLayout>
      <AdminDashboard></AdminDashboard>
    </SidebarLayout>
  );
}
