import Container from '@/components/layout/Container'
import GreenLine from '@/components/simulation/GreenLine'
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
        simulation
      </Container>
    </>
  )
}

export default Simulation