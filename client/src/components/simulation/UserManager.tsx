import React from 'react'
import ParticipantAvatar from './ParticipantAvatar'
import MicToggleButton from './MicToggleButton'

const UserManager = () => {
  return (
    <div
      className=' relative'
    >
      <ParticipantAvatar />
      <MicToggleButton />
    </div>
  )
}

export default UserManager