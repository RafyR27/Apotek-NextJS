"use client"

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { PropType } from "@/types/props";

const MainLayout = (props: PropType) => {
    const { children } = props;

    return (
        <div className="w-full min-h-screen">
            <Navbar/>
            <section>{children}</section>
            <Footer/>
        </div>
    )
}

export default MainLayout;