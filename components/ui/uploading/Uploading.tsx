import React from "react";
import uploadingAnimation from "../../../lottie/uploading/uploading.json";
import LottieAnimation from "../LottieAnimation/LottieAnimation";

interface UploadingProps{
  size?:number
}
const  Uploading :React.FC<UploadingProps>=({size=200,})=> {
  return (
    <div>
      <LottieAnimation animationData={uploadingAnimation} width={size} height={size} />
    </div>
  );
}

export default Uploading;
