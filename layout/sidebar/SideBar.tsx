"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import NavContent from "@/components/navContent/NavContent";


const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className=" hidden md:block overflow-y-auto custom-scrollbar border-r border-lightGray  md:w-72 xl:w-96">
      <NavContent />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backgroundClickClose={false}
        showCloseButton
      />
    </section>
  );
};

export default SideBar;
