import React from 'react';
import Avatar from './Avatar';
import type { bot } from '@/types/bot';

interface BotManagerProps {
  bots: bot[];
  currentlyActiveBot: number | null;
  botResponse: string | null;
}

const BotManager = ({ bots, currentlyActiveBot, botResponse }: BotManagerProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-16 relative">
      {bots.map((bot, index) => (
        <div key={bot.id} className="flex flex-col items-center">
          <Avatar imgSrc={bot.imgSrc} />
          {currentlyActiveBot === index && botResponse && (
            <div className="mt-2 p-2 bg-background rounded shadow max-w-xs text-center">
              {botResponse}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BotManager;
