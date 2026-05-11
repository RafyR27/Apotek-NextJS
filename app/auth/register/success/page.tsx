"use client";

import FeedbackLayout from "@/components/layouts/FeedbackLayout/FeedbackLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess/RegisterSuccess";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

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
