import React from 'react'
import HourDate from './HourDate'
import UserSubHeader from './UserSubHeader'
import '../styles/SubHeader.css'

const SubHeader = () => {
  return (
    <div className="subheader">
        <HourDate />
        <UserSubHeader />
    </div>
  )
}

export default SubHeader