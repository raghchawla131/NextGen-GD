import React from 'react'
import Avatar from './Avatar';

const BotManager = ({ botsCount } : { botsCount: number}) => {
  const bots = ['bot1', 'bot2', 'bot3'];
  return (
    <>
      <div className=' flex flex-col sm:flex-row justify-center items-center gap-16 relative'>
        {bots.map((bot, index) => (
          <div key={index}>
            <Avatar imgSrc='/src/assets/28638-removebg-preview.png' />
          </div>
        ))}
      </div>
    </>
  )
}

export default BotManager