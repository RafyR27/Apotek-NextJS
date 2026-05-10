"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaHospitalSymbol } from "react-icons/fa";
import useLogin from "./useLogin";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FcGoogle } from "react-icons/fc";

const LoginSection = () => {
  const { toggleVisibility, isVisible, loginWithGoogle } = useLogin();

  

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <FaHospitalSymbol className="text-tertiary text-[1.8rem]" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            ApotekKart
          </h1>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground text-base text-[0.9rem]">
          Please login to continue using ApotekKart.
        </p>
      </div>

      {/* Social Buttons */}
      <div className="mb-6">
        <Button
          type="button"
          variant={"outline"}
          className="w-full h-10 rounded-xl text-sm font-medium shadow-sm flex gap-3"
          onClick={() => loginWithGoogle()}
        >
          <FcGoogle />
          Login with Google
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

      {/* Form */}
      <form className="space-y-5">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email*</FieldLabel>
            <Input
              className="h-10"
              type="email"
              id="email"
              placeholder="Enter your email address"
              name="email"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password*</FieldLabel>
            <InputGroup className="h-10">
              <InputGroupInput
                id="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
                name="password"
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
          </Field>
        </FieldGroup>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <p className="text-muted-foreground">Remember Me</p>
          </div>

          <button
            type="button"
            className="font-medium hover:text-emerald-600 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <Button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold">
          Login to ApotekKart
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={"/auth/register"}
          className="font-semibold text-slate-900 hover:text-tertiary transition-colors"
        >
          Create Account
        </Link>
      </div>
    </>
  );
};

export default LoginSection;
