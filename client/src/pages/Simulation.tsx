import React from 'react';
import BotManager from '@/components/simulation/BotManager';
import UserManager from '@/components/simulation/UserManager';
import CountdownClock from '@/components/simulation/CountdownClock';
import { useParams } from 'react-router-dom';

const bots = [
  { id: 1, name: 'Alice', role: 'Analyst' },
  { id: 2, name: 'Bob', role: 'Optimist' },
  { id: 3, name: 'Eve', role: 'Skeptic' }
];

const Simulation = () => {
  const { time } = useParams();
  const timeInMinutes = parseInt(time || '0');

  return (
    <div className="min-h-[88vh] w-full flex flex-col md:grid md:grid-cols-2 bg-background text-foreground overflow-hidden">
      
      {/* Grid Left */}
      <div className="grid grid-rows-2 border-b md:border-b-0 md:border-r">
        
        {/* Grid Left Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Top Left */}
          <div className="bg-yellow-100 md:col-span-2 flex flex-col items-center justify-center p-6">
            {timeInMinutes > 0 && (
              <CountdownClock minutes={timeInMinutes} />
            )}
          </div>

          {/* Top Right */}
          <div className="bg-green-100 md:border-l flex items-center justify-center p-4">
            <UserManager />
          </div>
        </div>

        {/* Grid Left Bottom */}
        <div className="bg-red-100 flex items-center justify-center p-4">
          <BotManager bots={bots} />
        </div>
      </div>

      {/* Grid Right (Chat + Input) */}
      <div className="flex flex-col h-full">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-blue-100 p-4">
          <div className="text-blue-800 font-semibold text-center">
            Right Side (Chat Area)
          </div>
        </div>

        {/* Input Box */}
        <div className="border-t bg-blue-200 px-4 py-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full border px-4 py-2 rounded-md bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Simulation;
