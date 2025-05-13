import Container from '@/components/layout/Container'
import Avatar from '@/components/simulation/Avatar';
import GreenLine from '@/components/simulation/GreenLine'
import Timer from '@/components/simulation/Timer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const Simulation = () => {
  const { time } = useParams();
  const parsedTime = time ? parseInt(time)*60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);

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
        <Avatar imgSrc={'/src/assets/28638-removebg-preview.png'} />
      </Container>
    </>
  )
}

export default Simulation