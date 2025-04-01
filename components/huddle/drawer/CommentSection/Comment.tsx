import React from "react";

import moment from "moment";
import Image from "next/image";
import { truncateName } from "@/utils/truncateName";

const Comment = ({
  comment,
  name,
  profile,
  time,
}: {
  comment: string | null;
  name: string | undefined;
  time: string | null;
  profile: string | undefined;
}) => {
  return (
    <section className="py-2">
      <div className="flex flex-col px-2">
        <div className="flex justify-between items-center ">
          <div className=" flex justify-center items-center ">
            {/* <img src={premium} className="absolute -top-1" /> */}
            <Image
              alt="profile"
              width={48}
              height={48}
              src={profile || "/tw/placeholder/placeholder-image-icon.jpg"}
              className="rounded-full object-cover bg-cover"
            />
            <h2 className=" flex  flex-nowrap ml-2 base-bold text-sm ">
              {truncateName(name || "")}
            </h2>
          </div>

          {/* <img className="ml-1" src="" alt="country" /> */}
          <div className=" py-2 text-xs flex text-gray-500">
            {moment(time)?.format("DD/MM/YYYY")} |{" "}
            {moment(time)?.format("hh:mm A")}
          </div>
          {/* <img className="ml-2" width={24} src={moreInfo} alt="more info" /> */}
        </div>
        <p className="pl-16 text-xs text-gray-500">{comment}</p>
      </div>
    </section>
  );
};

export default Comment;
