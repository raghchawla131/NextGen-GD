import React, { type ReactNode } from 'react'

const Container = ({children} : {children : ReactNode}) => {
  return (
    <div className=' px-6 sm:px-6 lg:px-24 max-w-7xl mx-auto'>
      {children}
    </div>
  )
}

export default Container