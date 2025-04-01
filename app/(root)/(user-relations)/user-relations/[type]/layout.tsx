import React from "react";

import ResponsiveWrapper from "@/components/shared/ResponsiveWrapper";
import UserRelationsList from "@/components/account/UserRelationsList";
import { useTranslations } from "next-intl";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) => {
  const t = useTranslations("common");
  return (
    <ResponsiveWrapper>
      <div className="md:w-full lg:max-w-md  w-full flex flex-col  border   pb-8">
        <div className="sticky w-full z-50 bg-white">
          <h2 className="text-lg base-bold capitalize  py-5 px-3">
            {t(params?.type)}
          </h2>
        </div>
        <UserRelationsList type={params?.type} />
      </div>

      <div className="w-full min-h-screen">{children}</div>
    </ResponsiveWrapper>
  );
};

export default Layout;
