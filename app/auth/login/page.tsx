import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import LoginSection from "@/components/views/Auth/LoginSection/LoginSection";
import { use } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const { callbackUrl } = use(searchParams);

  return (
    <AuthLayout>
      <LoginSection searchParams={callbackUrl || ""}></LoginSection>
    </AuthLayout>
  );
}
