"use client";

import Link from "next/link";
import { FaHospitalSymbol, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-auto px-6 lg:px-20 flex lg:flex-row flex-col justify-around pb-20 gap-10 lg:gap-0">
      <div className="lg:w-1/3 w-full flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <FaHospitalSymbol className="text-tertiary text-[2rem]" />
          <h1 className="text-primary font-heading font-bold text-[1.2rem]">
            ApotekKart
          </h1>
        </div>

        <p className="text-[0.9rem] font-medium min-h-20 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus porro minus, commodi nam quia voluptatem sequi
          architecto temporibus autem illum.
        </p>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-[1.1rem]">Connect</p>
          <div className="flex gap-3 items-center text-2xl">
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="lg:w-2/3 w-full flex lg:flex-row flex-wrap lg:justify-around gap-7 lg:gap-0">
        <div className="flex lg:gap-5 gap-3 w-35 flex-col">
          <p className="font-bold text-[1.2rem]">Know Us</p>

          <div className="flex flex-col gap-3 text-[0.9rem] text-muted-foreground font-medium">
            <Link className="hover:text-primary" href="/about">
              About
            </Link>
            <Link className="hover:text-primary" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex lg:gap-5 gap-3 w-35 flex-col">
          <p className="font-bold text-[1.2rem]">Category</p>

          <div className="flex flex-col gap-3 text-[0.9rem] text-muted-foreground font-medium">
            <Link className="hover:text-primary" href="/about">
              Privacy Policy
            </Link>
            <Link className="hover:text-primary" href="/contact">
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className="flex lg:gap-5 gap-3 w-35 flex-col">
          <p className="font-bold text-[1.2rem]">Trust & Legal</p>

          <div className="flex flex-col gap-3 text-[0.9rem] text-muted-foreground font-medium">
            <Link className="hover:text-primary" href="/about">
              Privacy Policy
            </Link>
            <Link className="hover:text-primary" href="/contact">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
