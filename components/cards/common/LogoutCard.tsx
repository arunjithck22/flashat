import Button from '@/components/ui/Button/Button'
import React from 'react'

type LogoutCardProps = {
  onConfirm: () => void
  onCancel: () => void
}

const LogoutCard: React.FC<LogoutCardProps> = ({ onConfirm, onCancel }) => {
  return (
    
      <div className="">
        <h2 className="text-xl font-semibold mb-4 text-visitorText">You sure you wanna log out?</h2>
        <div className="flex justify-between gap-4">
          <Button
            onClick={onCancel}
            bgNone
            textColor='text-visitorText'
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className=""
          >
            Log Out
          </Button>
        </div>
      </div>
    
  )
}

export default LogoutCard
