import React from 'react'
import Images from '../ui/Images/Images'

interface NoDataFoundProps{
    huddle?:boolean
    podium?:boolean
}

const NoDataFound:React.FC<NoDataFoundProps> = ({huddle=false,podium=false}) => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      {huddle && (
        <div>
          <Images
            src="/icons/huddle/nopost.png"
            width={300}
            height={300}
            alt="no post"
          />
          <p className='mt-4'>No Posts yet! Create the first post to get started.</p>
        </div>
      )}
      {podium && (
        <Images
          src="/icons/huddle/nopost.png"
          width={300}
          height={300}
          alt="no post"
        />
      )}
    </div>
  );
}

export default NoDataFound
