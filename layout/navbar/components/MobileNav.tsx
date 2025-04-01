"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import { Icons } from "@/components/ui/icons/icons";
import FlashatTextLogo from "@/components/ui/logo/FlashatTextLogo";
import Drawer from "@/components/ui/sidebar/Drawer";
import NavContent from "@/components/navContent/NavContent";


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block md:hidden">
      {/* Menu Icon to Open Sidebar */}
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu"
        width="w-10"
        bgNone
        marginTop="mt-0"
      >
        <Icons.Menu />
      </Button>

      {/* Drawer Sidebar */}
      <Drawer
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
      >
        <div className="p-4">
          <FlashatTextLogo />
          <NavContent />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNav;
