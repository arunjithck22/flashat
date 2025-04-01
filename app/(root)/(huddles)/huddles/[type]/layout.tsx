import HuddleFilter from "@/components/huddle/HuddleList/HuddleFilter";

import React, { Suspense } from "react";

import HuddleLoading from "@/components/huddle/shimmers/HuddleLoading";
import HuddleList from "@/components/huddle/HuddleList/HuddleList";
import { HuddleProvider } from "@/contexts/huddles/HuddleProvider";

import ResponsiveWrapper from "@/components/shared/ResponsiveWrapper";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) => {
  return (
    <HuddleProvider>
      <ResponsiveWrapper>
        <div className="md:w-full lg:max-w-md  w-full flex flex-col  border   pb-8">
          <HuddleFilter currentStatus={params.type} />

          <Suspense fallback={<HuddleLoading />}>
            <HuddleList type={params.type} />
          </Suspense>
        </div>

        <div className="w-full min-h-screen">
          {" "}
          <Suspense fallback={<HuddleLoading />}>{children}</Suspense>
        </div>
      </ResponsiveWrapper>
    </HuddleProvider>
  );
};

export default Layout;
