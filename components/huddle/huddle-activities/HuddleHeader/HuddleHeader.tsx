"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import RightSectionHeader from "@/components/right-section/RightSectionHeader";
import BackButton from "../../BackButton";
import HuddleOptions from "./HuddleOptions";
import Image from "next/image";
import HuddleSkelton from "../../HuddleSkelton";
import { useHuddle } from "@/app/hooks/huddles/useHuddle";
import { API_STATUS, HUDDLE_USER_STATUS } from "@/common/constant";
import HuddleProfile from "./HuddleProfile";
import { Params } from "@/types";

const HuddleHeader = () => {
  const pathname = usePathname();

  if (pathname.includes("/huddles/public")) {
    return <PublicHuddleHeader />;
  } else {
    return <AuthHuddleHeader />;
  }
};

const PublicHuddleHeader = () => {
  const params = useParams();

  // Local state to store localStorage values
  const [huddleData, setHuddleData] = useState({
    huddle_profile_image: "",
    huddle_name: "",
    online_count: 0,
    total_members: 0,
  });

  // Fetch data from localStorage after the component mounts
  useEffect(() => {
    setHuddleData({
      huddle_profile_image: localStorage.getItem("huddle_profile_image") || "",
      huddle_name: localStorage.getItem("huddle_name") || "Unnamed Huddle",
      online_count: parseInt(localStorage.getItem("online_count") || "0", 10),
      total_members: parseInt(localStorage.getItem("total_members") || "0", 10),
    });
  }, []);

  return (
    <RightSectionHeader>
      <div className="flex gap-3 justify-center items-center">
        <BackButton path={`/huddles/${params.type}`} />
        <figure className="flex">
          <div className="relative">
            <Image
              alt="group"
              src={
                huddleData.huddle_profile_image ||
                "/tw/placeholder/huddle-default-profile.svg"
              }
              className="h-12 w-12 rounded object-cover position-center ltr:mr-4 rtl:ml-4 border border-primary"
              style={{ backgroundColor: "rgba(116, 125, 135, 0.202484)" }}
              width={100}
              height={100}
            />
          </div>
          <figcaption className="flex flex-col justify-between">
            <p className="font-bold text-tprimary">{huddleData.huddle_name}</p>
            <p className="flex items-center text-sm text-tprimary gap-2">
              <Image
                src="/tw/group-line.svg"
                width={16}
                height={16}
                alt="groupline"
              />
              {huddleData.total_members}
              <span className="h-3 bg-gray-200 w-0.5"></span>
              <span className="rounded bg-green-500 w-2 h-2"></span>
              <span>{huddleData.online_count}</span>
              <span className="ml-1 text-sm">Online</span>
            </p>
          </figcaption>
        </figure>
      </div>
      {/* <HuddleOptions type={params.type} huddleId={params.id} /> */}
    </RightSectionHeader>
  );
};

const AuthHuddleHeader = () => {
  const params: Params = useParams();
  const { data: singleHuddleData, status } = useHuddle(
    params?.id?.toString() || ""
  );

  return (
    <>
      {status === API_STATUS.SUCCESS && (
        <RightSectionHeader>
          <div className="flex gap-3 justify-center items-center">
            <BackButton path={`/huddles/${params.type}`} />

            <HuddleProfile data={singleHuddleData} />
          </div>
          {singleHuddleData?.result?.user_status !==
            HUDDLE_USER_STATUS.ADMIN_BLOCKED && (
            <HuddleOptions
              type={params.type as string}
              huddleId={params.id as string}
            />
          )}
        </RightSectionHeader>
      )}
      {status === API_STATUS.PENDING && (
        <div>
          <HuddleSkelton />
        </div>
      )}
      {status === API_STATUS.ERROR && (
        <div>
          <HuddleSkelton />
        </div>
      )}
    </>
  );
};

export default HuddleHeader;
