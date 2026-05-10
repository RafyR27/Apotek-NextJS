import { signIn } from "@/lib/auth-client";
import { useState } from "react";

const useRegister = () => {
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
        callbackURL: "/products"
      })
    }

    return {
      toggleVisibility,
      isVisible,
      toggleVisibilityConfirm,
      isVisibleConfirm,
      registerWithGoogle,
    };
}

export default useRegister;


