import React from 'react'
import HourDate from './HourDate'
import UserSubHeader from './UserSubHeader'

const SubHeader = () => {
  return (
    <div className="subheader">
        <HourDate />
        <UserSubHeader />
    </div>
  )
}

export default SubHeader