import { generateFromGemini } from "@/utils/geminiAPI";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface ChatMessage {
  sender: 'user' | 'bot';
  name?: string;
  text: string;
}

interface SimulationContextType {
  micOn: boolean;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  status: 'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended';
  setStatus: React.Dispatch<React.SetStateAction<SimulationContextType['status']>>;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  botGeminiResponses: string[];
  setBotGeminiResponses: React.Dispatch<React.SetStateAction<string[]>>;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  topic: string;
  starter: string;
}

const SimulationContext = createContext<SimulationContextType | null>(null);

interface SimulationProviderProps {
  children: React.ReactNode;
  topic: string;
  starter: string;
}

export const SimulationProvider = ({ children, topic, starter }: SimulationProviderProps) => {
  const [micOn, setMicOn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended'>('idle');
  const [transcript, setTranscript] = useState("");
  const [botGeminiResponses, setBotGeminiResponses] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const [gdTopic] = useState(topic);
  const [gdStarter] = useState(starter);

  const prevMicOnRef = useRef(false);
  const isProcessingUserInputRef = useRef(false);

  // 🧠 micOn and status logic — transition handling
  useEffect(() => {
    if (status === 'ended') return;

    if (micOn) {
      if (status !== 'user-speaking') {
        setStatus('user-speaking');
      }
    } else {
      if (status === 'user-speaking') {
        setStatus('waiting');
      }
    }
  }, [micOn, status]);

  // 📤 Only add user message to chat history when mic turns off and transcript is available
  useEffect(() => {
    const prevMicOn = prevMicOnRef.current;
    prevMicOnRef.current = micOn;

    if (prevMicOn && !micOn && !isProcessingUserInputRef.current) {
      if (transcript.trim()) {
        isProcessingUserInputRef.current = true;
        
        // Add user message to chat history immediately
        setChatHistory(prev => [
          ...prev,
          { sender: 'user' as const, name: 'You', text: transcript }
        ]);
        // Trigger bots to respond to user message
        setTimeout(() => setStatus('bots-talking'), 500);
        isProcessingUserInputRef.current = false;
        setTranscript("");
      } else {
        setTranscript("");
      }
    }
  }, [micOn, transcript]);

  // Remove userGeminiResponse and related useEffect

  return (
    <SimulationContext.Provider
      value={{
        micOn,
        setMicOn,
        status,
        setStatus,
        transcript,
        setTranscript,
        botGeminiResponses,
        setBotGeminiResponses,
        chatHistory,
        setChatHistory,
        topic: gdTopic,
        starter: gdStarter,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
  return context;
};
