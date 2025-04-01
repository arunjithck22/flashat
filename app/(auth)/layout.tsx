import Image from "next/image";
import React from "react";
import logo from "../../public/logo/flashat-logo.png";
import styles from "./layout.module.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen">
      <div className={` flex  flex-col md:flex-row w-full`}>
        <section
          className={`${styles.logo_section} hidden w-1/2 md:flex lg:flex-1  p-4 justify-center items-center`}
        >
          {/* First Section Content */}
          <Image
            className="hidden md:block"
            src={logo}
            alt="logo"
            width={120}
          />
        </section>
        <section className="flex flex-1 bg-lightPink justify-center items-center flex-col ">
          <Image className="md:hidden" src={logo} alt="mob-logo" width={80} />
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
