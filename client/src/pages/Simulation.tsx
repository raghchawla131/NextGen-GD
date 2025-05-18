import Container from '@/components/layout/Container';
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine';
import Timer from '@/components/simulation/Timer';
import MicToggleButton from '@/components/simulation/MicToggleButton';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { generateFromGemini } from '@/utils/geminiAPI';
import type { bot } from '@/types/bot';

const bots: bot[] = [
  { id: 'bot1', imgSrc: '/src/assets/28638-removebg-preview.png' },
  { id: 'bot2', imgSrc: '/src/assets/28638-removebg-preview.png' },
  { id: 'bot3', imgSrc: '/src/assets/28638-removebg-preview.png' },
];

const Simulation = () => {
  const { time } = useParams();
  const parsedTime = time ? parseInt(time) * 60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [userText, setUserText] = useState<string>('');
  const [currentlyActiveBot, setCurrentlyActiveBot] = useState<number | null>(null);
  const [botResponse, setBotResponse] = useState<string | null>(null);

  const { transcript } = useSpeechRecognition(micOn);
  const prevMicOn = useRef<boolean>(micOn);

  useTextToSpeech(botResponse);

  useEffect(() => {
    if (!micOn && prevMicOn.current === true) {
      const timeout = setTimeout(() => {
        if (transcript.trim() !== '') {
          console.log("Mic turned off, using transcript:", transcript);
          setUserText(transcript);
          const selectRandomBot = Math.floor(Math.random() * bots.length);
          setCurrentlyActiveBot(selectRandomBot);
        } else {
          console.log("No transcript captured.");
        }
      }, 1000); // wait 1 second after mic is off

      return () => clearTimeout(timeout);
    }

    prevMicOn.current = micOn;
  }, [micOn, transcript]);

  useEffect(() => {
    if (micOn) {
      window.speechSynthesis.cancel();
      setBotResponse(null);
    }
  }, [micOn])

  useEffect(() => {
    if (userText.trim() !== '') {
      sendTextToGeminiForResponse(userText);
    }
  }, [userText]);

  const sendTextToGeminiForResponse = async (prompt: string) => {
    try {
      const response = await generateFromGemini(prompt);
      const geminiResponse = response.data.result;
      console.log("Gemini text response: ", response.data.result);
      setBotResponse(geminiResponse);
    } catch (error) {
      console.error('Gemini API error:', error);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <>
      <GreenLine timeLeft={timeLeft} duration={parsedTime} />
      <Container>
        <Timer timeLeft={timeLeft} />
        <div className="flex flex-col gap-16">
          <div className="relative w-fit mx-auto">
            <Avatar imgSrc="/src/assets/28638-removebg-preview.png" />
            <MicToggleButton micOn={micOn} toggleMic={() => setMicOn(!micOn)} />
          </div>
          <BotManager
            bots={bots}
            currentlyActiveBot={currentlyActiveBot}
            botResponse={botResponse}
          />
        </div>
      </Container>
    </>
  );
};

export default Simulation;
