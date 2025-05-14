import Container from '@/components/layout/Container'
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine'
import Timer from '@/components/simulation/Timer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const Simulation = () => {
  const { time } = useParams();
  const parsedTime = time ? parseInt(time)*60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [botsCount, setBotsCount] = useState<number>(3);

  useEffect(() => {
    if(timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if(prevTime <= 0) {
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
          <Avatar imgSrc={'/src/assets/28638-removebg-preview.png'} />
          <BotManager botsCount={botsCount} />
        </div>
      </Container>
    </>
  )
}

export default Simulation