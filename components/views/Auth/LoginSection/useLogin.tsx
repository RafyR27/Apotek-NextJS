import { useState } from "react";

const useLogin = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    return {
      toggleVisibility,
      isVisible,
    };
}

export default useLogin;


