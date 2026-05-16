import SidebarLayout from "@/components/layouts/SidebarLayout/SidebarLayout";
import AdminMedicines from "@/components/views/Admin/Medicines/AdminMedicines";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Medicines({
  searchParams,
}: {
  searchParams: Promise<{
    add?: string;
  }>;
}) {
  const { add } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  if (session.user.role === "user") redirect("/products");
  if (session.user.role === "kasir") redirect("/kasir/dashboard");

  return (
    <SidebarLayout user={session}>
      <AdminMedicines success={add || ""}></AdminMedicines>
    </SidebarLayout>
  );
}
