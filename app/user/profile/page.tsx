"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Profile() {
  // const { data: session, isPending } = useSession();
  const router = useRouter();

  const logOutButton = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/products");
        },
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Button type="button" onClick={() => logOutButton()}>
        Logout
      </Button>
    </div>
  );
}
