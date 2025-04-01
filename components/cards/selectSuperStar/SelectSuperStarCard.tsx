import React from "react";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa"; 
import Premium from "@/components/ui/icons/Premium";

interface CardProps {
  id: number;
  thumbnail?: string | null;
  name: string;
  username: string;
  verified: boolean;
  selectedId?: number | null;
  onSelect: (id: number) => void;
  membership: string;
}

const SelectSuperStarCard: React.FC<CardProps> = ({
  id,
  thumbnail,
  name,
  username,
  verified,
  selectedId,
  onSelect,
  membership,
}) => {
  const isSelected = selectedId === id;
  const isPremium = membership === "Premium"; 

  return (
    <div
      className={`flex items-center p-3 border rounded-md relative cursor-pointer transition-all mt-1 ${
        isSelected ? "bg-gray-50" : "border-gray-300"
      }`}
      onClick={() => onSelect(id)}
    >
      {/* ✅ Superstar Image or Default Icon */}
      <div className="relative w-[50px] h-[50px] flex items-center justify-center">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle className="text-gray-400 w-full h-full" />
        )}

        {isPremium && (
         <Premium/>
        )}
      </div>

      {/* Superstar Info */}
      <div className="ml-3 flex-grow">
        <p className="text-md font-semibold">
          {name} {verified && "✔️"}
        </p>
        <p className="text-sm text-gray-500">{username}</p>
      </div>

      {/* ✅ Tick Mark for Selected */}
      {isSelected && (
        <div className="absolute top-5 right-2 text-green-500 rounded-full p-1">
          <MdDone className="text-xl" />
        </div>
      )}
      
    </div>
  );
};

export default SelectSuperStarCard;
