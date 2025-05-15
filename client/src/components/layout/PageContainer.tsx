import React, { type ReactNode } from 'react'

const PageContainer = ({children} : {children : ReactNode}) => {
  return (
    <div className=' pt-18'>
      {children}
    </div>
  )
}

export default PageContainer