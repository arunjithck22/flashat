import { CreateHuddle } from "@/components/huddle/CreateHuddle/CreateHuddle";
import HuddleFormShimmer from "@/components/huddle/shimmers/HuddleFormShimmer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Suspense fallback={<HuddleFormShimmer />}>
        <CreateHuddle />
      </Suspense>
    </div>
  );
};

export default page;
