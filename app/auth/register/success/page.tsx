"use client";

import FeedbackLayout from "@/components/layouts/FeedbackLayout/FeedbackLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess/RegisterSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push("/auth/register");
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <FeedbackLayout>
      <RegisterSuccess></RegisterSuccess>
    </FeedbackLayout>
  );
}
