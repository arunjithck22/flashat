"use client";

import React from "react";
import Dropdown from "@/components/ui/DropdownBox/Dropdown";
import { Icons } from "@/components/ui/icons/icons";
import LanguageSelector from "./components/LanguageSelector";


const Settings = () => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown button={<Icons.Settings />} position="right">
        <LanguageSelector />
      </Dropdown>
    </div>
  );
};

export default Settings;
