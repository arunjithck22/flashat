import React from 'react'

const ForgotPasswordButton = ({onClick}:{onClick:()=>void}) => {
  return (
    <div>
       <p className="text-primary text-xs mt-medium text-center cursor-pointer" onClick={onClick} >FORGOT PASSWORD?</p>
    </div>
  )
}

export default ForgotPasswordButton
