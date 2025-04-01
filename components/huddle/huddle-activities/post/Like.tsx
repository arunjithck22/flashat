import likeIcon from "@/public/tw/post/likeIcon.svg";
import Image from "next/image";

export const Like = ({ likes }: { likes: string }) => {
  return (
    <div className="flex gap-2  justify-center items-center">
      <Image className="" width={16} src={likeIcon} alt="" />
      <span className="text-primary   text-lg">{likes} </span>
    </div>
  );
};
