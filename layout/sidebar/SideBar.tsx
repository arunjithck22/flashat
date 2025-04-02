"use client";

import Images from "@/components/ui/Images/Images";
import FlashatLogo from "@/components/ui/logo/FlashatLogo";
import Modal from "@/components/ui/modal/Modal";
import { sidebarLinks } from "@/constants";
import { COMMON_EVENTS } from "@/constants/events";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileContext } from "@/contexts/ProfileContext";
import { useSocket } from "@/contexts/SocketContext";
import { logout } from "@/service/signIn.service";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";

interface BlockEventPayload {
  eventName: string;
  data: { userId: string | number };
}

const SideBar = () => {
  const t = useTranslations("common");
  const pathname = usePathname();
  const { user } = useAuth();
  const { profileData, error } = useProfileContext();
  const { socket } = useSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dears, fans, stars, likers } = profileData || {};
  const handleBlockEvent = useCallback(
    async (payload: BlockEventPayload) => {
      if (
        payload.eventName === COMMON_EVENTS.BLOCK_USER_EVENT &&
        payload.data.userId === user
      ) {
        await logout();
      }
    },
    [user]
  );
  
  console.log("content loading")

  useEffect(() => {
    if (!socket) return;
    socket.on("message", handleBlockEvent);
    return () => socket.off("message", handleBlockEvent);
  }, [socket, handleBlockEvent]);

  return (
    <section className="hidden md:block  overflow-y-auto custom-scrollbar border-r border-lightGray ">
      <div className="flex flex-col flex-1 mt-6">
        {sidebarLinks.map(({ route, imgURL, activeImgURL, label }) => {
          const isActive = pathname.startsWith(route) || pathname === route;
          const count = { dears, fans, stars, likers }[label];

          return (
            <Link
              prefetch
              key={route}
              href={route}
              className={`flex items-center py-3 gap-4 px-6 bg-transparent ${
                ["/huddles", "/stars"].includes(route) ? "border-b border-primary" : ""
              }`}
            >
                <Images
                src={isActive ? activeImgURL : imgURL}
                alt={label}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <p className={`base-${isActive ? "bold text-primary" : "semibold text-tsecond"}`}>
                {t(label)}{!error && count ? ` (${count})` : ""}
              </p>
            </Link>
          );
        })}
      </div>
      <figure className="absolute bottom-1 left-8 cursor-pointer">
        <FlashatLogo />
      </figure>
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