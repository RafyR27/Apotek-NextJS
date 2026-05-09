"use client";

import { FaHospitalSymbol, FaSearch } from "react-icons/fa";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { MdLocationOn } from "react-icons/md";
import { Button } from "./button";

import { FaCartShopping, FaPrescriptionBottleMedical } from "react-icons/fa6";
import { IoIosCall, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import DROPDOWN_NAVBAR from "./constant/Navbar.constant";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LuClipboardList } from "react-icons/lu";
import { RemoveScroll } from "react-remove-scroll";

type MenuItem = {
  key: string;
  label: string;
  href: string;
};

type DropdownItem = {
  key: string;
  label: string;
  menu: MenuItem[];
};

const Navbar = () => {
  const dropdown_navbar = DROPDOWN_NAVBAR;
  const [isOpen, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<DropdownItem | null>(null);

  const path = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <nav className="w-full lg:h-22 h-18 bg-background lg:px-20 px-5 flex justify-between items-center border-b lg:border-none">
        <div className="flex items-center gap-2">
          <FaHospitalSymbol className="text-tertiary text-[2rem]" />
          <Link href={"/"} className="text-primary font-heading font-bold text-[1.2rem]">
            ApotekKart
          </Link>
        </div>

        <div className="hidden lg:block">
          <InputGroup className="max-w-xl">
            <InputGroupAddon align="inline-start" className="border-r-2 px-2 w-33">
              <MdLocationOn />
              <p className="truncate">Klari, Karawang</p>
            </InputGroupAddon>
            <InputGroupInput className="w-[66%]" placeholder="Cari Obat..." />
            <InputGroupAddon className="px-2">
              <FaSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="items-center justify-between gap-2 hidden lg:flex">
          <Button variant="outline">
            <Link className="flex gap-2 px-2" href={"/upload-prescription"}>
              <FaPrescriptionBottleMedical />
              <p>Upload</p>
            </Link>
          </Button>

          {/* <Button variant="outline">
            <Link href={"/history"} className="flex gap-2 px-4">
              <LuClipboardList />
              <p>History</p>
            </Link>
          </Button> */}

          <Button variant="outline">
            <Link href={"/cart"} className="flex gap-2 px-2">
              <FaCartShopping />
              <p>Cart</p>
            </Link>
          </Button>

          <Button className="flex gap-2 px-4">
            <IoIosCall />
            <p>Call Canter</p>
          </Button>

          <Button className="px-4">
            <Link href={"/auth/login"}>Login / Register</Link>
          </Button>

          {/* Profile */}
          {/* <Link
            href={"/profil"}
            className="flex w-full justify-start items-center gap-3"
          >
            <span className="w-8 h-8 rounded-full bg-red-500"></span>
          </Link> */}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center lg:hidden"
        >
          <GiHamburgerMenu className="text-2xl text-foreground" />
        </button>
      </nav>

      {/* dropdown */}
      <div className="relative w-full pb-3 hidden lg:flex justify-center items-center gap-10 font-sans font-medium border-b">
        {dropdown_navbar.map((item: DropdownItem) => (
          <div
            key={item.key}
            className="flex items-center text-[0.85rem] cursor-pointer"
            onClick={() =>
              activeMenu?.key === item.key
                ? setActiveMenu(null)
                : setActiveMenu(item)
            }
          >
            {item.key === activeMenu?.key ? (
              <>
                <p className="text-primary">{item.label}</p>
                <RiArrowDropDownLine className="text-2xl rotate-180 text-primary" />
              </>
            ) : (
              <>
                <p>{item.label}</p>
                <RiArrowDropDownLine className="text-2xl" />
              </>
            )}

            {activeMenu?.key === item.key && (
              <div className="absolute top-8 left-0 z-50 max-h-70 h-auto flex justify-center items-center w-full bg-background py-6 pb-10 shadow-xl transition-all duration-300">
                <div className="flex flex-col flex-wrap gap-y-4 gap-x-10 max-h-70 items-start w-1/2">
                  {item.menu.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="flex items-center text-[0.85rem] cursor-pointer hover:text-primary"
                    >
                      <p>{item.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* blur background */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Sidebar */}
      <RemoveScroll
        enabled={isOpen}
        className={`fixed right-0 top-0 z-50 h-screen innet w-[85%] max-w-sm border-l bg-background p-6  shadow-2xl transition-all duration-300 lg:hidden overflow-y-auto flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaHospitalSymbol className="text-tertiary text-[2rem]" />
              <h1 className="text-primary font-heading font-bold text-[1.2rem]">
                ApotekKart
              </h1>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MdLocationOn />
              <p>Klari, Karawang</p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border bg-background px-2 shadow-sm">
              <InputGroupInput placeholder="Cari Obat..." />
              <InputGroupAddon>
                <FaSearch />
              </InputGroupAddon>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3 flex flex-col gap-3">
            <div className="flex flex-col gap-6">
              {/* profile */}
              {/* <Link
              href={"/profil"}
              className="flex w-full justify-start items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-red-500"></span>
              <div className="w-1/2">
                <p className="text-[0.8rem] truncate">Budi Subudi</p>
                <p className="text-[0.7rem] text-muted-foreground truncate">BudiSubudi@gmail.com</p>
              </div>
            </Link> */}
              <Button
                className="flex w-full justify-center items-center"
                size="lg"
              >
                <Link href={"/auth/login"}>Login / Register</Link>
              </Button>

              <Link
                href={"/upload-prescription"}
                className="flex w-full items-center gap-3"
              >
                <FaPrescriptionBottleMedical className="text-lg" />
                <p className="text-[1rem]">Upload Prescription</p>
              </Link>

              <Link href={"/cart"} className="flex w-full items-center gap-3">
                <FaCartShopping className="text-lg" />
                <p className="text-[1rem]">Cart</p>
              </Link>

              <Link
                href={"/history"}
                className="flex w-full items-center gap-3"
              >
                <LuClipboardList className="text-lg" />
                <p className="text-[1rem]">History</p>
              </Link>

              <Link href={"#"} className="flex w-full items-center gap-3">
                <IoIosCall className="text-lg text-primary" />
                <p className="text-[1rem] text-primary">Call Canter</p>
              </Link>
            </div>
            <p className="font-bold">Category</p>
            {dropdown_navbar.map((item: DropdownItem) => (
              <div
                key={item.key}
                className="flex items-center text-[0.85rem] cursor-pointer"
                onClick={() =>
                  activeMenu?.key === item.key
                    ? setActiveMenu(null)
                    : setActiveMenu(item)
                }
              >
                <div className="flex justify-between items-center w-full">
                  <p className="text-[1rem]">{item.label}</p>
                  <RiArrowDropRightLine className="text-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-muted-foreground text-[0.8rem]">
            ApotekKart 1.0v
          </h4>
        </div>
      </RemoveScroll>

      <RemoveScroll
        enabled={isMobile && !!activeMenu}
        className={cn(
          "fixed top-0 right-0 z-50 h-screen lg:hidden flex flex-col justify-start items-start w-[85%] max-w-sm bg-background p-6 pb-20 shadow-xl transition-all duration-300",
          activeMenu?.key ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="w-full mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaHospitalSymbol className="text-tertiary text-[2rem]" />
            <h1 className="text-primary font-heading font-bold text-[1.2rem]">
              ApotekKart
            </h1>
          </div>
          <button
            onClick={() => setActiveMenu(null)}
            className="flex items-center justify-center"
          >
            <RiArrowDropRightLine className="text-[2.4rem]" />
          </button>
        </div>
        <div className="flex flex-col flex-wrap gap-5 h-full items-start w-full">
          {activeMenu?.menu.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex justify-between w-full items-center text-[0.85rem] cursor-pointer hover:text-primary"
              onClick={() => {
                setOpen(false);
                setActiveMenu(null);
              }}
            >
              {path === item.href ? (
                <>
                  <p className="text-[1rem] text-primary">{item.label}</p>
                  <RiArrowDropRightLine className="text-2xl text-primary" />
                </>
              ) : (
                <>
                  <p className="text-[1rem]">{item.label}</p>
                  <RiArrowDropRightLine className="text-2xl" />
                </>
              )}
            </Link>
          ))}
        </div>
      </RemoveScroll>
    </>
  );
};

export default Navbar;
