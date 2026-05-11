"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaHospitalSymbol } from "react-icons/fa";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FcGoogle } from "react-icons/fc";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import SpinnerCircle from "@/components/ui/spinner";

const RegisterSection = () => {
  const {
    toggleVisibility,
    isVisible,
    toggleVisibilityConfirm,
    isVisibleConfirm,
    registerWithGoogle,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors
  } = useRegister();

  return (
    <>
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2 mb-10">
        <FaHospitalSymbol className="text-tertiary text-[1.8rem]" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            ApotekKart
          </h1>
        </div>
      </Link>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Create Account
        </h2>
        <p className="text-muted-foreground text-base text-[0.9rem]">
          Please register to continue using ApotekKart.
        </p>
      </div>

      {/* Social Buttons */}
      <div className="mb-6">
        <Button
          type="button"
          variant={"outline"}
          className="w-full h-10 rounded-xl text-sm font-medium shadow-sm flex gap-3"
          onClick={() => registerWithGoogle()}
        >
          <FcGoogle />
          Sign Up with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-muted-foreground">
            Or continue with Email
          </span>
        </div>
      </div>
      {errors.root && (
        <p className="mb-2 text-center font-medium text-red-500">
          {errors?.root?.message}
        </p>
      )}
      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Full Name*</FieldLabel>
                <Input
                  {...field}
                  className="h-10"
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email*</FieldLabel>
                <Input
                  {...field}
                  className="h-10"
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password*</FieldLabel>
                <InputGroup className="h-10">
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      className="focus:outline-none my-auto px-2 cursor-pointer"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password*
                </FieldLabel>
                <InputGroup className="h-10">
                  <InputGroupInput
                    {...field}
                    id="confirmPassword"
                    type={isVisibleConfirm ? "text" : "password"}
                    placeholder="Enter your confirm password"
                  />
                  <InputGroupAddon align="inline-end">
                    <button
                      className="focus:outline-none my-auto px-2 cursor-pointer"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold"
          type="submit"
          disabled={isPendingRegister}
        >
          {isPendingRegister ? <SpinnerCircle /> : "Sign Up to ApotekKart"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have account?{" "}
        <Link
          href={"/auth/login"}
          className="font-semibold text-slate-900 hover:text-tertiary transition-colors"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default RegisterSection;
