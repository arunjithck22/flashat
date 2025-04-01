import React from "react";
import LoginButton from "./components/LoginButton";
import FlashatTextLogo from "@/components/ui/logo/FlashatTextLogo";
import Settings from "./components/Settings/Settings";
import MobileNav from "./components/MobileNav";


const Navbar = () => {
  return (
    <nav className="background-light900_dark100 h-20 items-center px-5  flex justify-between  fixed  w-full  border-b border-lightGray   ">
     <FlashatTextLogo/>
      <div className=" flex items-center  gap-5">
        <Settings/>
        <LoginButton />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
