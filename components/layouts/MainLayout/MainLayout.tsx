"use client"

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import { PropType } from "@/types/props";

const MainLayout = (props: PropType) => {
    const { children, sessionData } = props;

    return (
        <div className="w-full min-h-screen">
            <Navbar session={sessionData} />
            <section>{children}</section>
            <Footer/>
        </div>
    )
}

export default MainLayout;