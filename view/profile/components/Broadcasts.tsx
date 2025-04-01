import React from 'react'
import { useTranslations } from "next-intl";
import { ProfileResponse } from '@/types/profile';

interface ProgressProps {
    profileData: ProfileResponse;
  }
  
const Broadcasts: React.FC<ProgressProps> = ({ profileData }) => {
    const t = useTranslations("profile");
  return (
    <section className='p-normal'>
      <div className="flex flex-col max-w-xl md:flex-row justify-between mt-medium pb-5 border-b-2 text-sm">
        <label className="text-tsecond" htmlFor="">
          {t("total_broadcasts")}
        </label>
        <span>{profileData.total_broadcasts}</span>
      </div>

      <div className="flex flex-col max-w-xl md:flex-row justify-between pt-4 text-sm">
        <label className="text-tsecond" htmlFor="">
          {t("total_likes")}
        </label>
        <span>{profileData.total_likes}</span>
      </div>
    </section>
    
  )
}

export default Broadcasts