"use client";

import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import LoginSection from "@/components/views/Auth/LoginSection/LoginSection";

export const dynamic = "force-dynamic";

export default function Login() {
  return (
    <AuthLayout>
      <LoginSection></LoginSection>
    </AuthLayout>
  );
}
