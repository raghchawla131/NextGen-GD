import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface detailsProp {
//   id: number, 
//   name: string, 
//   role: string,
// }

const ParticipantAvatar = ( {details} ) => {
  return (
    <div>
      <Avatar className=' h-40 w-40'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default ParticipantAvatar