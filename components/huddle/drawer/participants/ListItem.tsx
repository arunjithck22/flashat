
import { Members } from "@/types/huddles/index";
import Image from "next/image";
import React from "react";

const ListItem = ({ item }: { item: Members }) => {
  return (
    <li
      className="flex items-center justify-between py-4 px-2 border-b-2 gap-2 relative"
      key={item.member_id}
    >
      <div className="flex gap-2 items-center justify-center">
        <div className=" relative overflow-hidden ">
          <Image
            className="w-full h-full rounded-full bg-gray-300 object-cover bg-center"
            alt="user"
            src={`${
              item.thumbnail
                ? item.thumbnail
                : "/tw/placeholder/placeholder-image-icon.jpg"
            }`}
            width={40}
            height={40}
          />
          {item?.membership === "Premium" && (
            <Image
              src="/tw/post/premium.svg"
              width={15}
              height={15}
              className="absolute top-0 "
              alt="premium"
            />
          )}
        </div>
        <div className="flex flex-col  gap-1 justify-between">
          <h4 className="text-sm base-semibold">{item.name}</h4>
          <div className="flex items-center">
            {item?.is_manager || item?.is_admin ? (
              <div className="flex gap-2  ">
                <span className=" uppercase px-4 border-2 rounded-full text-tsecond text-xs base-semibold">
                  {item?.role}
                </span>
                {item?.relationship && (
                  <span className=" border uppercase bg-gray-400 text-white font-bold px-4 py-0.5 rounded-full  text-xs">
                    {item?.relationship}
                  </span>
                )}
              </div>
            ) : (
              item.relationship && (
                <span className="border uppercase bg-gray-400 text-white font-bold px-4 py-0.5 rounded-full  text-xs">
                  {item?.relationship}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      {item?.status === "admin_blocked" && (
        <div className="flex text-end">
          <span className="italic text-xs">Blocked</span>
        </div>
      )}
    </li>
  );
};

export default ListItem;
