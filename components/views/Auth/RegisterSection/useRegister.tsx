"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import environment from "@/config/environment";

const formSchema = z
  .object({
    fullName: z
      .string("Full name is required")
      .trim()
      .min(10, "Full name is too short")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters"),

    email: z.email("Email is required").trim().toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/^(?!.*\s).*$/, "Password must not contain spaces"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const useRegister = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibilityConfirm = () => {
    setIsVisibleConfirm(!isVisibleConfirm);
  };

  const registerWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/admin/dashboard",
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const callbackURL = (email: string) =>
    `${environment.BETTER_AUTH_URL}/auth/register/success?email=${email}`;

  const registerService = async (payload: IUser) => {
    const name = payload.fullName.replace(/\s/g, "-");
    const avatar = `https://ui-avatars.com/api/?name=${name}&background=random`;

    await signUp.email({
      name: payload.fullName,
      email: payload.email,
      password: payload.password,
      image: avatar,

      fetchOptions: {
        throw: true,
      },
    });
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      setError("root", {
        message: error.error.message,
      });
    },
    onSuccess: (_, variables) => {
      router.push(callbackURL(variables.email));
      reset({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    },
  });

  const handleRegister = (data: IUser) => mutateRegister(data);

  return {
    toggleVisibility,
    isVisible,
    toggleVisibilityConfirm,
    isVisibleConfirm,
    registerWithGoogle,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
