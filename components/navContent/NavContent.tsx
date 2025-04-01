"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Images from "@/components/ui/Images/Images";
import FlashatLogo from "@/components/ui/logo/FlashatLogo";
import { sidebarLinks } from "@/constants";
import { useTranslations } from "next-intl";
import { useProfileContext } from "@/contexts/ProfileContext";
import { useAuth } from "@/contexts/AuthContext"; 
import { showToast } from "@/utils/toast";


const NavContent = () => {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { profileData, error } = useProfileContext();
  const { user } = useAuth(); // Get user state from AuthContext

  const { dears, fans, stars, likers } = profileData || {};

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault(); // Prevent navigation
      showToast("Please login to access this page", "success")
    }
  };

  return (
    <div className="flex flex-col  h-full  ">
      <div className="flex flex-1 flex-col ">
        {sidebarLinks.map(({ route, imgURL, activeImgURL, label }) => {
          const isActive = pathname.startsWith(route) || pathname === route;
          const countMap: Record<string, number | undefined> = { dears, fans, stars, likers };
          const count = countMap[label];
          return (
            <Link
              prefetch
              key={route}
              href={user ? route : "#"}
              onClick={(e) => handleNavigation(e)}
              className={`flex items-center py-3 gap-4 px-6 bg-transparent 
              transition-all duration-300 hover:bg-gray-100 hover:scale-105 
              ${
                ["/huddles", "/stars"].includes(route)
                  ? "border-b border-primary py-5"
                  : ""
              }`}
            >
              <Images
                src={isActive ? activeImgURL : imgURL}
                alt={label}
                width={24}
                height={24}
                className="w-6 h-6 transition-transform duration-300 hover:scale-110"
              />
              <p
                className={`base-${
                  isActive ? "bold text-primary" : "semibold text-tsecond"
                }
              transition-colors duration-300 hover:text-primary`}
              >
                {t(label)}
                {!error && count ? ` (${count})` : ""}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Bottom Flashat Logo */}
      <div className="flex flex-col justify-center mx-auto ">
        <FlashatLogo />
      </div>
    </div>
  );
};

export default NavContent;
