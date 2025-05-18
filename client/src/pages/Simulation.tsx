import Container from '@/components/layout/Container'
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine'
import Timer from '@/components/simulation/Timer';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import MicToggleButton from '@/components/simulation/MicToggleButton';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { generateFromGemini } from '@/utils/geminiAPI';


const Simulation = () => {
  const { time } = useParams();
  const parsedTime = time ? parseInt(time) * 60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [botsCount, setBotsCount] = useState<number>(3);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [userText, setUserText] = useState<string>('');

  const { transcript } = useSpeechRecognition(micOn);

  const prevMicOn = useRef<boolean>(micOn);

  useEffect(() => {
    if (prevMicOn.current === true && micOn === false) {
      console.log("user input speech to text: ", transcript);
      setUserText(transcript);
    }
    prevMicOn.current = micOn;
  }, [micOn, transcript]);

  useEffect(() => {
    sendTextToGeminiForResponse(userText);
  }, [userText])

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
  }, [timeLeft]);

  const sendTextToGeminiForResponse = async (prompt: string) => {
    try {
      const response = await generateFromGemini(prompt);
      console.log('Gemini response:', response.data.result);
    } catch (error) {
      console.log('Error calling Gemini API:', error);

    }
  }

  return (
    <>
      <GreenLine timeLeft={timeLeft} duration={parsedTime} />
      <Container>
        <Timer timeLeft={timeLeft} />
        <div className=' flex flex-col gap-16'>
          <div className="relative w-fit mx-auto">
            <Avatar imgSrc={'/src/assets/28638-removebg-preview.png'} />
            <MicToggleButton micOn={micOn} toggleMic={() => setMicOn(!micOn)} />
          </div>
          <BotManager botsCount={botsCount} />
        </div>
      </Container>
    </>
  )
}

export default Simulation