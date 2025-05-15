import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { Outlet } from "react-router";

const GeneralLayout: React.FC = () => {
  return (
    <>
        {/* mobile nav */}
        <div className=" md:hidden"><MobileNav /></div>
        {/* desktop nav */}
        <div className=" hidden md:block"><Navbar /></div>
        <Outlet />
        {/* <Footer /> */}
    </>
  )
}

export default GeneralLayout;