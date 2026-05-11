"use client";

import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import ProductsSection from "@/components/views/Products/ProductsSection";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession();

  return (
    <MainLayout sessionData={session}>
      <ProductsSection></ProductsSection>
    </MainLayout>
  );
}
