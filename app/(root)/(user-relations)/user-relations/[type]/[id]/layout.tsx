
import BackButton from "@/components/huddle/BackButton";
import RightSectionHeader from "@/components/right-section/RightSectionHeader";
import { Params, TranslationFunction } from "@/types";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Params;
}) => {
  const t: TranslationFunction = useTranslations("id_card");
  return (
    <Suspense fallback={<p>loading</p>}>
      <section className="flex flex-col  relative w-full h-screen border pl-1 ">
        <RightSectionHeader>
          <div className="flex gap-3 justify-center items-center">
            <BackButton path={`/user-relations/${params.type}`} />
            <h2 className="base-bold text-lg py-1">
              {t("cloud_identity_card")}
            </h2>
          </div>
        </RightSectionHeader>

        <div>{children}</div>
      </section>
    </Suspense>
  );
};

export default Layout;
