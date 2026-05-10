"use client";

import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import ProductsSection from "@/components/views/Products/ProductsSection";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="h-13 w-13 animate-spin rounded-full border-5 border-secondary border-t-primary" />
      </div>
    );
  } 

  return (
    <MainLayout sessionData={session}>
      <ProductsSection></ProductsSection>
    </MainLayout>
  );
}
