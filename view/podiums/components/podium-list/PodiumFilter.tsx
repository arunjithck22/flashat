import IconButton from "@/components/ui/IconButton";
import { PODIUM_TABS } from "@/constants/podiums/constants";
import { TranslationFunction } from "@/types";

import { useTranslations } from "next-intl";

interface PodiumFilterProps {
  currentStatus: string | undefined | string[];
}
const PodiumFilter = ({ currentStatus }: PodiumFilterProps) => {
  const t: TranslationFunction = useTranslations("podiums");

  //   const params = useParams();
  //   const router = useRouter();

  // if (!isAuthenticated) return null;

  const renderIconButton = (tab: string, label: string) => (
    <IconButton
      variant={currentStatus === tab ? "primary" : ""}
      href={`/podiums/${tab}`}
    >
      <span>{label}</span>
    </IconButton>
  );

  return (
    <div className="sticky w-full z-50 bg-white">
      <div className="p-2 lg:p-3 xl:p-4 flex flex-col gap-2 bg-white">
        {/* Navigation Buttons */}
        <div className="w-full flex justify-between base-semibold">
          {renderIconButton(PODIUM_TABS.LIVE_PODIUMS, t("live_podiums"))}
          {renderIconButton(PODIUM_TABS.LIVE_FRIENDS, t("live_friends"))}
          {renderIconButton(PODIUM_TABS.MY_PODIUMS, t("my_podiums"))}
        </div>
      </div>
    </div>
  );
};

export default PodiumFilter;
