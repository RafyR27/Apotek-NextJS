"use client";

import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import HomeSection from "@/components/views/Home/HomeSection";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession();

  return (
    <MainLayout sessionData={session}>
      <HomeSection></HomeSection>
    </MainLayout>
  );
}


