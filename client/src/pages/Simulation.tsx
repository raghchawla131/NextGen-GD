import Container from '@/components/layout/Container'
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine'
import Timer from '@/components/simulation/Timer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Mic, MicOff } from 'lucide-react';


const Simulation = () => {
  const { time } = useParams();
  const parsedTime = time ? parseInt(time) * 60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [botsCount, setBotsCount] = useState<number>(3);
  const [micOn, setMicOn] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft])

  return (
    <>
      <GreenLine timeLeft={timeLeft} duration={parsedTime} />
      <Container>
        <Timer timeLeft={timeLeft} />
        <div className=' flex flex-col gap-16'>
          <div className="relative w-fit mx-auto">
            <Avatar imgSrc={'/src/assets/28638-removebg-preview.png'} />
            <div
              className='absolute bottom-0 right-0 cursor-pointer bg-blue-500 rounded-full p-2 transition-all duration-300 ease-in-out w-8 h-8 flex items-center justify-center'
              onClick={() => setMicOn(!micOn)}
            >
              <Mic
                className={`text-white w-4 h-4 absolute transition-all duration-300 ease-in-out ${micOn ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
              />
              <MicOff
                className={`text-white w-4 h-4 absolute transition-all duration-300 ease-in-out ${micOn ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
              />
            </div>

          </div>

          <BotManager botsCount={botsCount} />
        </div>
      </Container>
    </>
  )
}

export default Simulation