import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import HomeSection from "@/components/views/Home/HomeSection";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error: "TOKEN_EXPIRED" }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { error } = await searchParams;

  if(error){
    redirect("/token-expired");
  }

  return (
    <MainLayout sessionData={session}>
      <HomeSection></HomeSection>
    </MainLayout>
  );
}
