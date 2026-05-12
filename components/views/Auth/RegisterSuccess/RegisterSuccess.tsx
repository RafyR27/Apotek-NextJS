"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHospitalSymbol } from "react-icons/fa";

const RegisterSuccess = () => {
    const router = useRouter();

    return (
      <div className="flex max-w-screen min-h-screen flex-col items-center justify-center gap-10 p-4">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center gap-2">
            <FaHospitalSymbol className="text-tertiary text-[2.2rem]" />
            <Link
              href={"/"}
              className="text-primary font-heading font-bold text-[1.4rem]"
            >
              ApotekKart
            </Link>
          </div>
          <Image
            src="/success-register.png"
            alt="success"
            width={300}
            height={300}
            className="w-[80%] lg:w-full"
            loading="eager"
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-center w-full px-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">
            Create Account Success
          </h1>
          <p className="text-lg font-bold">
            Check your email for account activation
          </p>
          <Button size="lg" className="w-full lg:w-1/4 mt-7" onClick={() => router.push("/")}>
            Back To Home
          </Button>
        </div>
      </div>
    );
}

export default RegisterSuccess;