import { TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OthersProps {
  total_received_gifts: number;
  total_huddle_owned: number;
  total_huddles_participant: number;
  user_managed_huddles_participants: number;
  total_public_podiums: number;

  total_flash_published: number;
  total_broadcasts: number;
  total_huddles_admin?: number;
}

const Others: React.FC<OthersProps> = ({
  total_received_gifts,
  total_huddle_owned,
  total_huddles_participant,
  user_managed_huddles_participants,
  total_public_podiums,

  total_flash_published,
  total_broadcasts,
  total_huddles_admin,
}) => {
  const t: TranslationFunction = useTranslations("id_card");
  const listItems = [
    {
      icon: "/tw/profile/gift-1.svg",
      label: t("total_received_gifts"),
      value: total_received_gifts,
    },
    {
      icon: "/tw/profile/huddle.svg",
      label: t("total_huddles_owned"),
      value: total_huddle_owned,
    },
    {
      icon: "/tw/profile/total-members.svg",
      label: t("total_participants_in_own_huddles"),
      value: user_managed_huddles_participants,
    },
    {
      icon: "/tw/profile/huddle-2.svg",
      label: t("total_joined_huddles"),
      value: total_huddles_participant,
    },
    {
      icon: "/tw/profile/flash-1.svg",
      label: t("total_flash_videos_published"),
      value: total_flash_published,
    },
    {
      icon: "/tw/profile/public-podium.svg",
      label: t("total_public_podiums"),
      value: total_public_podiums,
    },
    {
      icon: "/tw/profile/public-podium.svg",
      label: t("total_huddles_admin"),
      value: total_huddles_admin,
    },

    {
      icon: "/tw/profile/postat-1.svg",
      label: t("total_broadcast"),
      value: total_broadcasts,
    },
  ];
  return (
    <ul>
      {listItems?.map((item, index) => (
        <li key={index} className="flex justify-between border-b py-3">
          <div className="flex gap-3">
            <Image src={item.icon} alt="gift" width={30} height={30} />
            <span>{item.label}</span>
          </div>
          <span className="base-bold">{item.value} </span>
        </li>
      ))}
    </ul>
  );
};

export default Others;
