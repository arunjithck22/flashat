import dynamic from "next/dynamic";
import { Suspense } from "react";
import ProfileLoader from "@/components/SkeltonLoaders/ProfileLoader";
const Profile = dynamic(() => import("@/view/profile"), { ssr: false });

const ProfilePage = () => {
  return (
    <div className="flex w-full h-screen flex-1 ">
      <Suspense fallback={<ProfileLoader />}>
        <Profile />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
