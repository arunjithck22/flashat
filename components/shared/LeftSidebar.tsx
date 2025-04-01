// "use client";
// import { useLogout } from "@/app/hooks/useLogout";
// import { sidebarLinks } from "@/constants";
// import { COMMON_EVENTS } from "@/constants/events";
// import { useAuth } from "@/contexts/AuthContext";
// import { useProfileContext } from "@/contexts/ProfileContext";
// import { useSocket } from "@/contexts/SocketContext";
// import { useTranslations } from "next-intl";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useCallback, useState } from "react";
// import FlashatLogo from "./FlashatLogo";
// import Modal from "../ui/modal/Modal";

// const LeftSidebar = () => {
//   const t = useTranslations("common");
//   const pathname = usePathname();
//   const { user } = useAuth();
//   const { logoutUser } = useLogout();
//   const { profileData, error } = useProfileContext();
//   const { socket } = useSocket();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Define handleLogout before useEffect
//   const handleLogout = useCallback(async () => {
//     await logoutUser();
//     window.location.href = "/";
//   }, [logoutUser]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleBlockEvent = async (payload: {
//       eventName: string;
//       data: { userId: string | number };
//     }) => {
//       if (
//         payload.eventName === COMMON_EVENTS.BLOCK_USER_EVENT &&
//         payload.data.userId === user
//       ) {
//         handleLogout();
//       }
//     };

//     socket.on("message", handleBlockEvent);

//     return () => {
//       socket.off("message", handleBlockEvent);
//     };
//   }, [socket, user, handleLogout]); // Add missing dependencies

//   // useEffect(() => {
//   //   if (!user) {
//   //     setIsModalOpen(true);
//   //   }
//   // }, [user]);
//   return (
//     <section className="sticky hidden md:block left-0 top-0  h-screen border custom-scrollbar    justify-between overflow-y-auto  border-r  pt-24 lg:w-[206px]">
//       <div className="flex flex-1  flex-col mt-6">
//         {sidebarLinks?.map((item) => {
//           const isActive =
//             (pathname.includes(item.route) && item.route.length > 1) ||
//             pathname === item.route;
//           return (
//             <Link
//               prefetch={true}
//               key={item.route}
//               href={item.route}
//               className={`flex items-center  py-3 gap-4 bg-transparent px-6 ${
//                 (item?.route === "/huddles" || item?.route === "/stars") &&
//                 "border-b border-primary"
//               } `}
//             >
//               <Image
//                 src={isActive ? item.activeImgURL : item.imgURL}
//                 alt={item.label}
//                 width={20}
//                 height={20}
//                 className={`${
//                   isActive ? "text-primary" : "text-gray-500"
//                 } w-6 h-6`}
//               />
//               <p
//                 className={`${
//                   isActive
//                     ? "base-bold text-primary"
//                     : "base-semibold text-gray-500"
//                 } `}
//               >
//                 {t(item.label)}
//                 {!error &&
//                 {
//                   dears: profileData?.dears,
//                   fans: profileData?.fans,
//                   stars: profileData?.stars,
//                   likers: profileData?.likers,
//                 }[item?.label]
//                   ? ` (${
//                       {
//                         dears: profileData?.dears,
//                         fans: profileData?.fans,
//                         stars: profileData?.stars,
//                         likers: profileData?.likers,
//                       }[item?.label]
//                     })`
//                   : ""}
//               </p>
//             </Link>
//           );
//         })}
//       </div>
//       <figure className="absolute bottom-1 left-8 cursor-pointer">
//         <FlashatLogo />
//       </figure>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         backgroundClickClose={false}
//         showCloseButton={true}
//       ></Modal>
//     </section>
//   );
// };

// export default LeftSidebar;

import React from 'react'

const LeftSidebar = () => {
  return (
    <div>
      LeftSidebar
    </div>
  )
}

export default LeftSidebar

