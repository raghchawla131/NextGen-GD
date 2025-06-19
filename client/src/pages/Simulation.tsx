import BotManager from '@/components/simulation/BotManager';
import UserManager from '@/components/simulation/UserManager';
import CountdownClock from '@/components/simulation/CountdownClock';
import { useParams } from 'react-router-dom';
import ChatFeed from '@/components/simulation/ChatFeed';
import { useSimulation } from '@/context/SimulationContext';
import { useEffect } from 'react';

const bots = [
  { id: 1, name: 'Alice', role: 'Analyst' },
  { id: 2, name: 'Bob', role: 'Optimist' },
  { id: 3, name: 'Eve', role: 'Skeptic' }
];

const Simulation = () => {
  const {status, setStatus} = useSimulation();
  const { time } = useParams();
  const timeInMinutes = parseInt(time || '0');

  useEffect(() => {
    if(status === 'idle') {
      setStatus('bots-talking');
      return;
    }
    if(status === 'waiting') {
      const pauseBeforeReplyTimeout = setTimeout(() => {
        setStatus('bots-talking');
      }, 500);
      return () => clearTimeout(pauseBeforeReplyTimeout);
    }
    if(status === 'ended') {
      console.log("gd ended");
    }
  }, [status, setStatus])

  return (
    <div className="min-h-[88vh] w-full flex flex-col md:grid md:grid-cols-2 bg-background text-foreground overflow-hidden">
      {/* Grid Left */}
      <div className="grid grid-rows-2 border-b md:border-b-0 md:border-r">
        {/* Grid Left Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Top Left */}
          <div className="md:col-span-2 bg-foreground rounded-2xl flex flex-col items-center justify-center p-6">
            {timeInMinutes > 0 && (
              <CountdownClock minutes={timeInMinutes} />
            )}
          </div>
          {/* Top Right */}
          <div className="  rounded-2xl md:border-l flex items-center justify-center p-4">
            <UserManager />
          </div>
        </div>

        {/* Grid Left Bottom */}
        <div className=" bg-foreground rounded-2xl flex items-center justify-center p-4">
          <BotManager bots={bots} />
        </div>
      </div>

      {/* Grid Right (Chat + Input) */}
      <div className="flex flex-col h-full">
        <ChatFeed />
      </div>
    </div>
  );
};

export default Simulation;
