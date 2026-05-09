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

    return {
      toggleVisibility,
      isVisible,
      toggleVisibilityConfirm,
      isVisibleConfirm,
    };
}

export default useRegister;


