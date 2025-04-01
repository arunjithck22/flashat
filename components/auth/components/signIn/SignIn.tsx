import React, { useEffect, useState } from "react";
import EmailUserName from "./components/EmailUserName";
import MobileNumber from "./components/MobileNumber";
import Tabs from "@/components/ui/Tabs/Tabs";
import Heading from "@/components/Headers/AuthHeading";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "../signUp/SignUp";
import ForgotPasswordButton from "@/components/ui/Button/ForgotPasswordButton";
import GoogleButton from "@/components/ui/Button/GoogleButton";
import { ProfileCheckpoints } from "@/constants/enums";
import CreatePassword from "../signUp/components/CreatePassword";
import CreateProfile from "../signUp/components/CreateProfile";
import CreateUserName from "../signUp/components/CreateUserName";
import SelectSuperStar from "../signUp/components/SelectSuperStar/SelectSuperStar";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/contexts/authetication/SignUpContext";


const SignIn = () => {
  const router = useRouter();
  const {setShowCloseBtn,setIsModalOpen}=useSignUp()
  
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [checkPoint, setCheckPoint] = useState<ProfileCheckpoints | null>(null); 

  useEffect(() => {
    setShowCloseBtn(true)
  },[setShowCloseBtn])
  const tabs = [
    {
      label: "Email or Username",
      content: <EmailUserName setCheckPoint={setCheckPoint} />,
    },
    {
      label: "Mobile Number",
      content: <MobileNumber setCheckPoint={setCheckPoint} />,
    },
  ];
  const handleForgotPassword = () => {
    setIsForgotPasswordVisible(true);
  };
  const handleSignUp = () => {
    setIsSignUpVisible(true);
  };
  if (checkPoint === 0) {
    setIsModalOpen(false)
    router.push( `/huddles/user_managed`);
  }
  if (checkPoint) {
    switch (checkPoint) {
      case ProfileCheckpoints.PasswordSetup:
        return <CreatePassword email="" />;
      case ProfileCheckpoints.ProfileSetup:
        return <CreateProfile />;
      case ProfileCheckpoints.UsernameSetup:
        return <CreateUserName />;
      case ProfileCheckpoints.SuperStarSetup:
        return <SelectSuperStar />;
      default:
        break;
    }
  }
  return (
    <>
      {!isForgotPasswordVisible && !isSignUpVisible && (
        <div className="md:w-96 rounded-md">
          <div className="flex justify-center items-center mb-12">
            <Heading text="Login" />
          </div>
          <Tabs tabs={tabs} defaultActiveTab={0} marginSpace="mt-12" gap="gap-5 md:gap-8" />
          {/* Forgot Password Button */}
          <div className="text-right">
            <ForgotPasswordButton onClick={handleForgotPassword} />
          </div>
          {/* Google Sign-In Button */}
          <div className="mt-medium">
            <GoogleButton setCheckPoint={setCheckPoint}/>
          </div>
          {/* Sign Up Link */}
          <p className="text-xs mt-medium text-center cursor-pointer">
            Don&apos;t have an account?{" "}
            <span className="text-primary cursor-pointer" onClick={handleSignUp}>
              Sign Up
            </span>
          </p>
        </div>
      )}
      {isForgotPasswordVisible && <ForgotPassword onBack={() => setIsForgotPasswordVisible(false)} />}
      {isSignUpVisible && <SignUp onBack={() => setIsSignUpVisible(false)} />}
    </>
  );
};

export default SignIn;
