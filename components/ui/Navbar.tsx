"use client";

import { FaHospitalSymbol, FaSearch } from "react-icons/fa";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { MdLocationOn } from "react-icons/md";
import { Button } from "./button";

import { FaCartShopping } from "react-icons/fa6";
import { IoIosCall, IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import DROPDOWN_NAVBAR from "./constant/Navbar.constant";
import Link from "next/link";

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

  return (
    <>
      <nav className="w-full h-22 bg-background lg:px-20 px-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaHospitalSymbol className="text-tertiary text-[2rem]" />
          <h1 className="text-primary font-heading font-bold text-[1.2rem]">
            ApotekKart
          </h1>
        </div>

        <div className="hidden lg:block">
          <InputGroup className="max-w-xl">
            <InputGroupAddon align="inline-start" className="border-r-2 px-4">
              <MdLocationOn />
              <p>Klari, Karawang</p>
            </InputGroupAddon>
            <InputGroupInput className="w-80" placeholder="Cari Obat..." />
            <InputGroupAddon className="px-2">
              <FaSearch />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="items-center justify-between gap-3 hidden lg:flex">
          <Button variant="outline" className="flex gap-2 px-4">
            <FaCartShopping />
            <p>Cart</p>
          </Button>

          <Button className="flex gap-2 px-4">
            <IoIosCall />
            <p>Call Canter</p>
          </Button>
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
              <div className="absolute top-8 left-0 z-50 max-h-70 h-auto flex justify-center items-center w-full bg-background p-6 pb-10 shadow-xl transition-all duration-300">
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
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[85%] max-w-sm border-l bg-background p-6 shadow-2xl transition-all duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

          <div className="flex items-center gap-2 rounded-2xl border bg-background px-2 p-1 shadow-sm">
            <InputGroupInput placeholder="Cari Obat..." />
            <InputGroupAddon>
              <FaSearch />
            </InputGroupAddon>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <button className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition hover:bg-muted">
            <FaCartShopping className="text-muted-foreground" />
            <div>
              <p className="font-medium">Shopping Cart</p>
            </div>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg p-4 text-left transition hover:bg-muted">
            <IoIosCall className="text-muted-foreground text-xl" />
            <div>
              <p className="font-medium">Call Center</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
