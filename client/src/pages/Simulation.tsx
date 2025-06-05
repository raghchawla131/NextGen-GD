// Component imports
import Container from '@/components/layout/Container';
import Avatar from '@/components/simulation/Avatar';
import BotManager from '@/components/simulation/BotManager';
import GreenLine from '@/components/simulation/GreenLine';
import Timer from '@/components/simulation/Timer';
import MicToggleButton from '@/components/simulation/MicToggleButton';
import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { generateFromGemini } from '@/utils/geminiAPI';
import type { bot } from '@/types/bot';
import ChatHistory from '@/components/simulation/ChatHistory';
import { generateBotReplyPrompt, generateIntroPrompt } from '@/utils/prompts';

// Define a chat message type
type Message = {
  role: 'user' | 'bot';
  content: string;
};

// Bot configurations
const bots: bot[] = [
  { id: 'bot1', imgSrc: '/src/assets/28638-removebg-preview.png', personality: 'neutral' },
  { id: 'bot2', imgSrc: '/src/assets/28638-removebg-preview.png', personality: 'defensive' },
  { id: 'bot3', imgSrc: '/src/assets/28638-removebg-preview.png', personality: 'aggressive' },
];

const Simulation = () => {
  // URL param and query string handling
  const { time } = useParams(); // Group discussion duration
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gdTopic = searchParams.get('topic');
  const gdStarter = searchParams.get('starter');

  // Convert time to seconds
  const parsedTime = time ? parseInt(time) * 60 : 0;

  // State variables
  const [timeLeft, setTimeLeft] = useState<number>(parsedTime);
  const [micOn, setMicOn] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [activeBotIndex, setActiveBotIndex] = useState<number>(0);
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [conversationMode, setConversationMode] = useState<'bots' | 'user'>('bots');
  const { transcript } = useSpeechRecognition(micOn);
  const prevMicOn = useRef<boolean>(micOn);

  // Countdown timer
  useEffect(() => {
    if (parsedTime <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedTime]);

  // Reset state when route changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setBotResponse(null);
  }, [location.pathname]);

  // Handle microphone toggle and transcript capture
  useEffect(() => {
    if (micOn && !prevMicOn.current) {
      // Mic turned on
      window.speechSynthesis.cancel();
      setBotResponse(null);
      setConversationMode('paused');
    }

    if (!micOn && prevMicOn.current) {
      // Mic turned off
      if (transcript.trim() !== '') {
        setChatHistory((prev) => [...prev, { role: 'user', content: transcript.trim() }]);
        setConversationMode('user');
      } else {
        setConversationMode('bots');
      }
    }

    prevMicOn.current = micOn;
  }, [micOn, transcript]);

  // Generate bot reply using Gemini API
  const sendTextToGeminiForResponse = async (promptText: string, botStyle: string) => {
    try {
      const historyText = chatHistory
        .map((m) => `${m.role === 'user' ? 'User' : 'Bot'}: ${m.content}`)
        .join('\n');

      const fullPrompt = generateBotReplyPrompt(gdTopic ?? '', historyText, promptText, botStyle);
      const response = await generateFromGemini(fullPrompt);
      const geminiResponse = response.data.result;

      setChatHistory((prev) => [...prev, { role: 'bot', content: geminiResponse }]);
      setBotResponse(geminiResponse);
    } catch (error) {
      console.error('[Gemini] API error:', error);
      setBotResponse(null);
    }
  };

  // Conversation flow logic
  useEffect(() => {
    if (micOn) return; // Do nothing while mic is on

    if (conversationMode === 'bots') {
      const lastMessage = chatHistory[chatHistory.length - 1];
      const promptText = lastMessage ? lastMessage.content : generateIntroPrompt(gdTopic ?? '', bots[activeBotIndex].personality);
      const botStyle = bots[activeBotIndex].personality;

      if (!botResponse) {
        sendTextToGeminiForResponse(promptText, botStyle);
      }
    } else if (conversationMode === 'user') {
      const lastUserMessage = [...chatHistory].reverse().find((m) => m.role === 'user');
      if (!lastUserMessage) {
        setConversationMode('bots');
        return;
      }

      if (!botResponse) {
        const botStyle = bots[activeBotIndex].personality;
        sendTextToGeminiForResponse(lastUserMessage.content, botStyle);
      }
    }
  }, [botResponse, micOn, conversationMode, activeBotIndex, chatHistory, gdTopic]);

  // Text-to-Speech for bot responses
  useEffect(() => {
    if (!botResponse || micOn) return;

    const synth = window.speechSynthesis;
    const sanitizedResponse = botResponse.replace(/[*_`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(sanitizedResponse);
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onend = () => {
      // Switch conversation mode or bot
      if (conversationMode === 'user') {
        setConversationMode('bots');
        setActiveBotIndex((prev) => (prev + 1) % bots.length);
        setBotResponse(null);
      } else if (conversationMode === 'bots') {
        setActiveBotIndex((prev) => (prev + 1) % bots.length);
        setBotResponse(null);
      } else {
        setBotResponse(null);
      }
    };

    synth.speak(utterance);

    return () => synth.cancel();
  }, [botResponse, micOn, conversationMode]);

  // Trigger bot-started discussion intro
  useEffect(() => {
    if (gdStarter === 'bot' && gdTopic && chatHistory.length === 0) {
      setActiveBotIndex(0);
      setChatHistory([{ role: 'bot', content: `Group Discussion on: ${gdTopic}` }]);

      const spokenIntro = `Let's begin the discussion on "${gdTopic}".`;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenIntro);
      utterance.pitch = 1;
      utterance.rate = 1;

      utterance.onend = () => {
        setConversationMode('bots');
        setBotResponse(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [gdStarter, gdTopic, chatHistory.length]);

  // Render simulation UI
  return (
    <>
      <GreenLine timeLeft={timeLeft} duration={parsedTime} />
      <Container>
        <Timer timeLeft={timeLeft} />
        <div className="flex flex-col gap-16">
          <div className="relative w-fit mx-auto">
            <Avatar imgSrc="/src/assets/28638-removebg-preview.png" isSpeaking={micOn} />
            <MicToggleButton micOn={micOn} toggleMic={() => setMicOn(!micOn)} />
          </div>
          <BotManager bots={bots} currentlyActiveBot={activeBotIndex} micOn={micOn} />
        </div>
        <ChatHistory history={chatHistory} />
      </Container>
    </>
  );
};

export default Simulation;
