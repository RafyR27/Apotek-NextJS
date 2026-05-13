import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import LoginSection from "@/components/views/Auth/LoginSection/LoginSection";
import { use } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
    verified?: boolean;
  }>;
}) {
  const { callbackUrl, verified } = use(searchParams);

  return (
    <AuthLayout>
      <LoginSection
        searchParams={callbackUrl || ""}
        verified={verified || false}
      ></LoginSection>
    </AuthLayout>
  );
}
