import React from 'react'

interface EmptyPageProps {
message:string ,
cover:React.ReactNode
}

const EmptyPage = ({message,cover}:EmptyPageProps) => {
  return (
    <div className='="w-full flex flex-col justify-center items-center gap-3'>
        {cover}
         
        <span className='text-sm text-center text-gray-500'>{message}</span>
    </div>
  )
}

export default EmptyPage