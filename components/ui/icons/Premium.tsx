import React from 'react';
import { Icons } from './icons';

interface PremiumProps {
  top?: string;
  left?: string;
  size?:number
}

const Premium: React.FC<PremiumProps> = ({ top = "-5px", left = "-5px" ,size }) => {
  return (
    <div
      className="absolute bg-primary text-white p-1 rounded-full border-2 border-white"
      style={{ top, left }}
    >
      <Icons.Premium size={size} />
    </div>
  );
};

export default Premium;
