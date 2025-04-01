import Button from '@/components/ui/Button/Button';
import Heading from '@/components/Headers/AuthHeading';
import React, {  useState } from 'react';

import SelectSuperStar from './SelectSuperStar/SelectSuperStar';

interface ConfirmUserNameProps {
  userName: string;
  onBack: () => void; 
  submit:()=>void
}

const ConfirmUserName: React.FC<ConfirmUserNameProps> = ({ userName, onBack ,submit}) => {
  const [confirm, setConfirm] = useState(false);
  const handleSubmit = () => {
    submit();
    setConfirm(true);
  };


  return (
    <>
      {!confirm ? (
        <div className='w-52 md:w-72 rounded-md'>
          <>
            <Heading text="Confirm Username" />
            <p className="text-grayShade text-sm text-center">
              You have chosen the username &ldquo;{userName}&rdquo;. Once
              confirmed, it cannot be changed. Do you want to confirm?
            </p>
            <Button onClick={handleSubmit} rounded="rounded-xl">
            CONFIRM
            </Button>
            <Button
              onClick={onBack}
              bgNone={true}
              textColor="text-primary"
              className="border border-primary"
              rounded="rounded-xl"
            >
              CHANGE
            </Button>
          </>
        </div>
      ) : (
        <SelectSuperStar />
      )}
    </>
  );
};

export default ConfirmUserName;
