"use client";

import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import RegisterSection from "@/components/views/Auth/RegisterSection/RegisterSection";

export default function Login() {
  return (
    <AuthLayout>
      <RegisterSection></RegisterSection>
    </AuthLayout>
  );
}
