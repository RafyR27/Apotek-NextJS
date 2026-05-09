"use client";

import { PropType } from "@/types/props";
import { usePathname } from "next/navigation";

const AuthLayout = (props: PropType) => {
  const { children } = props;

  const path = usePathname();

  return (
    <div className="w-full min-h-screen">
      <div className="min-h-screen w-full bg-white grid lg:grid-cols-2 overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-full flex items-center justify-center px-6 py-10 lg:px-20 bg-background">
          <section className="w-full max-w-md">{children}</section>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex min-h-screen relative overflow-hidden bg-primary text-white px-10 items-center justify-center">
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/30 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-xl w-full">
            <div className="mb-16">
              {path.includes("/auth/login") ? (
                <>
                  <h1 className="text-5xl font-black leading-tight tracking-tight mb-6">
                    Welcome back! Please sign in to your ApotekKart account
                  </h1>

                  <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                    Access medicines, upload prescriptions, and manage your
                    health easily through ApotekKart.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-black leading-tight tracking-tight mb-6">
                    Create your ApotekKart account
                  </h1>

                  <p className="text-lg text-white/70 leading-relaxed max-w-lg">
                    Join ApotekKart and access medicines, upload prescriptions,
                    track orders, and manage your healthcare needs in one place.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
