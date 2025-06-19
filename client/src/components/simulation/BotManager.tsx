import React from 'react'
import ParticipantAvatar from './ParticipantAvatar'

interface bot {
  id: number,
  name: string,
  role: string,
}

interface botsProp {
  bots: bot[],
}

const BotManager = ( {bots}: botsProp ) => {
  return (
    <div className=' w-full flex justify-around'>
      {bots.map((bot) => (
        <div
          key={bot.id}
          className=''
        >
          <ParticipantAvatar details={bot} />
        </div>
      ))}
    </div>
  )
}

export default BotManager