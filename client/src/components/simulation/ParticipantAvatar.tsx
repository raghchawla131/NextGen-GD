import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BotDetails {
  id: number;
  name: string;
  role: string;
}

interface ParticipantAvatarProps {
  details: BotDetails;
  isActive?: boolean;
}

const ParticipantAvatar = ({ details, isActive = false }: ParticipantAvatarProps) => {
  return (
    <div className="relative">
      <Avatar className={`h-40 w-40 transition-all duration-300 ${
        isActive ? 'ring-4 ring-green-400 ring-opacity-75 scale-105' : ''
      }`}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{details.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {isActive && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            Speaking
          </div>
        </div>
      )}
      <div className="text-center mt-2">
        <p className="font-semibold text-sm">{details.name}</p>
        <p className="text-xs text-gray-500">{details.role}</p>
      </div>
    </div>
  )
}

export default ParticipantAvatar