import React from 'react';
import Avatar from './Avatar';
import type { bot } from '@/types/bot';

interface BotManagerProps {
  bots: bot[];
  currentlyActiveBot: number | null;
  micOn: boolean;
}

const BotManager = ({ bots, currentlyActiveBot, micOn }: BotManagerProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-16 relative">
      {bots.map((bot, index) => (
        <div key={bot.id} className="flex flex-col items-center">
          <Avatar imgSrc={bot.imgSrc} isSpeaking={index == currentlyActiveBot && !micOn} delay={true} />
        </div>
      ))}
    </div>
  );
};

export default BotManager;
