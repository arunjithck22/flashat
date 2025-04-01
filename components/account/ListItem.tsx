"use client";
import { encryptId } from "@/utils/clientUtils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import Images from "../ui/Images/Images";

interface ListItemProps {
  username: string;
  is_premium: boolean;
  profile_pic: string;
  user_id: number | string;
}

const ListItem: React.FC<ListItemProps> = ({
  username,
  is_premium,
  profile_pic,
  user_id,
}) => {
  const userId = encryptId(user_id.toString());
  const params = useParams();
  const type = params?.type;
  return (
    <article className="p-3 relative w-full border-b-2 first:border-t-2 border-bgray hover:cursor-pointer hover:bg-huddlegray">
      <Link href={`/user-relations/${type}/${userId}`}>
        <figure className="flex gap-3 items-center">
          <div className="relative">
            {is_premium && (
              <Image
                className="absolute -top-2 -left-2"
                width={20}
                height={20}
                src="/tw/post/premium.svg"
                alt="Premium Badge"
              />
            )}
            <div
              className={`rounded-full  w-12 h-12 bg-gray-300 ${
                profile_pic ? "" : "p-1"
              }`}
            >
              <Images
                src={profile_pic || "/icons/user-default.svg"}
                alt="Profile Picture"
              />
            </div>
          </div>
          <figcaption className="flex-1 flex justify-between">
            <span>{username}</span>
          </figcaption>
        </figure>
      </Link>
    </article>
  );
};

export default ListItem;
