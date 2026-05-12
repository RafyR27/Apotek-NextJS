import FeedbackLayout from "@/components/layouts/FeedbackLayout/FeedbackLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess/RegisterSuccess";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/auth/register");
  }

  return (
    <FeedbackLayout>
      <RegisterSuccess></RegisterSuccess>
    </FeedbackLayout>
  );
}
