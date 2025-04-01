import Navbar from "@/layout/navbar/Navbar";
import SideBar from "@/layout/sidebar/SideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen w-full flex-col bg-white">
      <Navbar />
      <div className="flex flex-1 pt-20 overflow-hidden">
        <SideBar />
        <section className="flex-1 h-full">
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
