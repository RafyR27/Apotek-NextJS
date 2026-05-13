"use client";

import { useTheme } from "next-themes";
import { FiAlertTriangle } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline, IoIosInformationCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <IoIosCheckmarkCircleOutline className="size-4" />,
        info: <IoIosInformationCircleOutline className="size-4" />,
        warning: <FiAlertTriangle className="size-4" />,
        error: <MdErrorOutline className="size-4" />,
        loading: <RiLoader4Fill className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
