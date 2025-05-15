import React from 'react'

const GreenLine = ({ timeLeft, duration } : { timeLeft: number; duration: number}) => {
  const percentage = (timeLeft / duration) * 100;
  
  return (
    <>
      <div className=' w-[100%] h-0.5 bg-white'>
        <div 
        className=' h-full bg-green-500 transition-all duration-1000 ease-linear'
        style={{ width: `${percentage}%`}}
        />

      </div>
    </>
  )
}

export default GreenLine