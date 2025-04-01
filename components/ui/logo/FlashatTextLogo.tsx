import Link from 'next/link'
import React from 'react'
import Images from '../Images/Images';

const FlashatTextLogo = () => {
  return (
    <div className=''>
      <Link href="/" className="flex items-center text-primary text-xl ">
        <Images
          src="/logo/text-logo.svg"
          alt="logo text"
          width={120}
          height={120}
        />
      </Link>
    </div>
  );
}

export default FlashatTextLogo