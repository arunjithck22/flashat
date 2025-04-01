import { useFlixOrCoinPackages } from "@/app/hooks/buy-flix-coins/useFlixOrCoinPackages";

import { API_STATUS } from "@/common/constant";
import { CoinPackageModal } from "@/types/buy-flix-coins";
import BuyCoinCard from "./BuyCoinCard";
import { useTranslations } from "next-intl";
import { TranslationFunction } from "@/types";
import CoinCardShimmer from "@/components/buy-flix-coins/shimmers/CoinCardShimmer";

export const CoinPackagesList: React.FC = () => {
  const t: TranslationFunction = useTranslations("buy_flix_coins");
  const { data, isLoading, status } = useFlixOrCoinPackages("coins");
  console.log("data", data?.result);

  //   useEffect(() => {
  //     let toastId: Id;
  //     if (isError) {
  //       toastId = notification.error({ message: "Something went wrong" });
  //     }
  //     return () => {
  //       if (toastId) notification.dismiss(toastId);
  //     };
  //   }, [isError]);
  return (
    <>
      <div className="coins">
        <h2 className="px-4 md:px-32 font-bold text-lg  text-secGray pt-12">
          {t("coins_packages")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-4 md:px-32 py-10 ">
          {isLoading && (
            <>
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
              <CoinCardShimmer />
            </>
          )}
          {status === API_STATUS.SUCCESS &&
            data?.result &&
            data?.result?.length > 0 &&
            data?.result?.map((item: CoinPackageModal) => {
              return (
                <BuyCoinCard
                  key={item?.id}
                  coins={item?.coins}
                  price={item?.price}
                  discounted_price={item?.discounted_price}
                  discount_percentage={item?.discount_percentage}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
