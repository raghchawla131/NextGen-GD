import Container from '@/components/layout/Container';
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine';
import Timer from '@/components/simulation/Timer';
import MicToggleButton from '@/components/simulation/MicToggleButton';
import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { generateFromGemini } from '@/utils/geminiAPI';
import type { bot } from '@/types/bot';
import ChatHistory from '@/components/simulation/ChatHistory';

type Message = {
  role: 'user' | 'bot';
  content: string;
};


const bots: bot[] = [
  { id: 'bot1', imgSrc: '/src/assets/28638-removebg-preview.png' },
  { id: 'bot2', imgSrc: '/src/assets/28638-removebg-preview.png' },
  { id: 'bot3', imgSrc: '/src/assets/28638-removebg-preview.png' },
];

const Simulation = () => {
  const { time } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const gdTopic = searchParams.get('topic');
  const gdStarter = searchParams.get('starter');

  const parsedTime = time ? parseInt(time) * 60 : 0;

  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [userText, setUserText] = useState<string>('');
  const [currentlyActiveBot, setCurrentlyActiveBot] = useState<number | null>(null);
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  // const [isRecording, setIsRecording] = useState<boolean>(false);

  const { transcript } = useSpeechRecognition(micOn);
  const prevMicOn = useRef<boolean>(micOn);

  // Function to handle text-to-speech
  useTextToSpeech(botResponse);

  useEffect(() => {
    // Cancel speech synthesis on every route change
    window.speechSynthesis.cancel();
    setBotResponse(null);
  }, [location.pathname]);

  // Handle the case when the mic is turned off
  useEffect(() => {
    if (!micOn && prevMicOn.current === true) {
      const timeout = setTimeout(() => {
        if (transcript.trim() !== '') {
          console.log("Mic turned off, using transcript:", transcript);
          setUserText(transcript);
          setChatHistory((prev) => [...prev, { role: 'user', content: transcript }])
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

  // if mic is turned on, cancel the speech synthesis
  useEffect(() => {
    if (micOn) {
      window.speechSynthesis.cancel();
      setBotResponse(null);
    }
  }, [micOn]);

  useEffect(() => {
    if (userText.trim() !== '') {
      sendTextToGeminiForResponse(userText);
    }
  }, [userText]);

  // Handle the case when the bot is selected
  useEffect(() => {
    if (gdStarter === 'bot' && gdTopic) {
      const introPrompt = `Start a group discussion on "${gdTopic}". Speak like a real person, keep it natural and simple, under 40 words. Just give a brief opening statement like a participant would, no extra details.`;

      const selectRandomBot = Math.floor(Math.random() * bots.length);
      setCurrentlyActiveBot(selectRandomBot);
      setUserText(introPrompt);
    }
  }, [gdStarter, gdTopic]);

  // Function to send text to Gemini API and get the response
  const sendTextToGeminiForResponse = async (latestText: string) => {
    try {
      const historyText = chatHistory
        .map(m => `${m.role === 'user' ? 'User' : 'Bot'}: ${m.content}`)
        .join('\n');

      const prompt = `
You are participating in a group discussion. Reply like a natural person in simple, conversational English.
Keep your response concise, under 50 words.
Keep it relevant to the discussion and friendly.

Conversation history:
${historyText}

User: ${latestText}
Bot:`;

      const response = await generateFromGemini(prompt);
      const geminiResponse = response.data.result;

      setBotResponse(geminiResponse);
      setChatHistory(prev => [...prev, { role: 'bot', content: geminiResponse }]);
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
          />
        </div>
        <ChatHistory history={chatHistory} />
      </Container>
    </>
  );
};

export default Simulation; 