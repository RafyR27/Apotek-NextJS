"use client";

import FeedbackLayout from "@/components/layouts/FeedbackLayout/FeedbackLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess/RegisterSuccess";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();

  const email =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("email")
      : null;

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
