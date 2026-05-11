"use client"

import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import CategorySection from "@/components/views/Category/CategorySection";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession();

  return (
    <MainLayout sessionData={session}>
      <CategorySection></CategorySection>
    </MainLayout>
  );
}
