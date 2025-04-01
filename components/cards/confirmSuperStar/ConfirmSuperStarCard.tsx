import React from 'react';
import Image from 'next/image';
import { MdDone } from "react-icons/md";
import { Icons } from '@/components/ui/icons/icons';
import Premium from '@/components/ui/icons/Premium';

interface ConfirmSuperStarCardProps {
  data: {
    id: number;
    name: string;
    thumbnail?: string | null;
    membership?: string;
    username?: string;
    verified: boolean;
    blocked?: boolean;
    dears: number;
    stars: number;
    fans: number;
    likers: number;
  };
}
const ConfirmSuperStarCard: React.FC<ConfirmSuperStarCardProps> = ({ data }) => {
  const {
    name,
    thumbnail,
    membership,
    username,
    dears,
    stars,
    fans,
    likers,
  } = data;

  return (
    <div className="flex shadow-md rounded-t-xl p-4 shadow-gray-300 border border-gray-200 relative gap-3 ">
      {/* Superstar Image and Membership Badge */}
      <div className="flex flex-col justify-center items-center w-4/12">
        <div className="relative w-[90px] h-[90px] flex items-center justify-center">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              width={90}
              height={90}
              className="rounded-full"
            />
          ) : (
            <div className="bg-gray-300 rounded-full p-5">
              <Icons.User size={50} />
            </div>
          )}
          {/* Premium Badge */}
          {membership === "Premium" && <Premium top="2px" size={18} />}
        </div>
        {/* Superstar Name & Description */}
        <h2 className="mt-4 text-xl font-bold text-center text-visitorText ">
          {name}
        </h2>
        <h2 className="mt-4 text-lg font-light text-center text-gray-400">
          {username}
        </h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-[2px] w-8/12 text-center">
        {/* Dears */}
        <div className="bg-podiumItemBg p-3 flex justify-center flex-col items-center rounded-tl-xl">
          <Image src="/icons/Dears.png" alt="Dears" width={30} height={30} />
          <p className="text-md font-semibold">{dears}</p>
          <p className="text-sm">Dears</p>
        </div>

        {/* Stars */}
        <div className="bg-podiumItemBg p-3 flex justify-center flex-col items-center">
          <Image src="/icons/Stars.png" alt="Stars" width={30} height={30} />
          <p className="text-md font-semibold">{stars}</p>
          <p className="text-sm">Stars</p>
        </div>

        {/* Fans */}
        <div className="bg-podiumItemBg p-3 flex justify-center flex-col items-center">
          <Image src="/icons/Fans.png" alt="Fans" width={30} height={30} />
          <p className="text-md font-semibold">{fans}</p>
          <p className="text-sm">Fans</p>
        </div>

        {/* Likers */}
        <div className="bg-podiumItemBg flex justify-center flex-col items-center rounded-br-xl">
          <Image src="/icons/Likers.png" alt="Likers" width={30} height={30} />
          <p className="text-md font-semibold">{likers}</p>
          <p className="text-sm">Likers</p>
        </div>
      </div>

      {/* Selection Checkmark */}
      <div className="absolute top-[-12px] right-[-12px] z-50 bg-[#3DE333] rounded-full p-3 shadow-md shadow-gray-300">
        <MdDone className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default ConfirmSuperStarCard;
