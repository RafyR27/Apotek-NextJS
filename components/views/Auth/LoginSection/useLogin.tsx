import environment from "@/config/environment";
import { signIn } from "@/lib/auth-client";
import { IUserLogin } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Email is required"),
  password: z.string("password is required"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const searchParams = useSearchParams();

  const rawCallback = searchParams.get("callbackUrl") || "";
  const callbackURL =
    rawCallback && rawCallback.startsWith(environment.BETTER_AUTH_URL)
      ? rawCallback
      : "/admin/dashboard";

  const loginWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginService = async (payload: IUserLogin) => {
    await signIn.email({
      email: payload.email,
      password: payload.password,

      fetchOptions: {
        throw: true,
      },
    });
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      setError("root", {
        message: error.error.message,
      });
    },
    onSuccess: () => {
      router.push(callbackURL);
      reset({
        email: "",
        password: "",
      });
    },
  });

  const handleLogin = (data: IUserLogin) => mutateLogin(data);

  return {
    toggleVisibility,
    isVisible,
    loginWithGoogle,
    control,
    handleSubmit,
    errors,
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
