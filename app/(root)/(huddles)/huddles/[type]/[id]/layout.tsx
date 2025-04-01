import HuddleHeader from "@/components/huddle/huddle-activities/HuddleHeader/HuddleHeader";
import React, { Suspense } from "react";

import HuddleActivityWrapper from "@/components/huddle/huddle-activities/HuddleActivityWrapper";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <HuddleActivityWrapper>
        <HuddleHeader />

        <div>{children}</div>
      </HuddleActivityWrapper>
    </Suspense>
  );
};

export default Layout;
