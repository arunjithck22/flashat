import ButtonFilter from '@/components/ui/Tabs/ButtonFilter'
import React from 'react'
import BlockedUsers from './components/BlockedUsers'
import FrozenUsers from './components/FrozenUsers'

const RestrictedUsers = ({isOpen}:{isOpen:boolean}) => {

    const tabs = [
        {
            label:"Blocked Users",
            content:<BlockedUsers/>
        },
        {
            label:"Frozen Users",
            content:<FrozenUsers/>
        }
    ]
  return (
    <div className="w-full min-w-[250px] max-w-[600px] sm:min-w-72 sm:max-w-96">
  <div className="w-full flex justify-center items-center">
    <ButtonFilter tabs={tabs} defaultActiveTab={0} />
  </div>
</div>

  )
}

export default RestrictedUsers