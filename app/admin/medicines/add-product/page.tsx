import SidebarLayout from "@/components/layouts/SidebarLayout/SidebarLayout";
import AddSection from "@/components/views/Admin/Medicines/AddSection/AddSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function addProduct() {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!session) redirect("/login");
      if (session.user.role === "user") redirect("/products");
      if (session.user.role === "kasir") redirect("/kasir/dashboard");

    return (
      <SidebarLayout user={session}>
        <AddSection></AddSection>
      </SidebarLayout>
    );
}