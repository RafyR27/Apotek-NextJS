import { signIn } from "@/lib/auth-client";
import { useState } from "react";

const useLogin = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const loginWithGoogle = async () => {
      await signIn.social({
        provider: "google",
        callbackURL: "/products"
      })
    }

    return {
      toggleVisibility,
      isVisible,
      loginWithGoogle,
    };
}

export default useLogin;


