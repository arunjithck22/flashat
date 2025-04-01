import React from "react";
import emptyAnimation from "../../../lottie/empty/Animation - 1730872693170.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

function Empty() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LottieAnimation
        animationData={emptyAnimation}
        width={200}
        height={300}
        loop={false}
      />
    </div>
  );
}

export default Empty;
