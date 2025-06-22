import { generateFromGemini } from "@/utils/geminiAPI";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface ChatMessage {
  sender: 'user' | 'bot';
  name?: string; // For bot name if needed
  text: string;
}

interface SimulationContextType {
  micOn: boolean;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  status: 'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended';
  setStatus: React.Dispatch<React.SetStateAction<SimulationContextType['status']>>;
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  userGeminiResponse: string;
  setUserGeminiResponse: React.Dispatch<React.SetStateAction<string>>;
  botGeminiResponses: string[];
  setBotGeminiResponses: React.Dispatch<React.SetStateAction<string[]>>;
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  topic: string;
  starter: string;
}


const SimulationContext = createContext<SimulationContextType | null>(null)

interface SimulationProviderProps {
  children: React.ReactNode;
  topic: string;
  starter: string; // e.g. "bot" or "user"
}

export const SimulationProvider = ({ children, topic, starter }: SimulationProviderProps) => {
  const [micOn, setMicOn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended'>('idle');
  const [currBotIndex, setCurrBotIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [userGeminiResponse, setUserGeminiResponse] = useState("");
  const [botGeminiResponses, setBotGeminiResponses] = useState<string[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Save these in state or refs to use later
  const [gdTopic] = useState(topic);
  const [gdStarter] = useState(starter);

  const prevMicOnRef = useRef(false);

  useEffect(() => {
    if (status === 'ended') return;

    if (micOn) {
      setStatus('user-speaking');
    } else if (status === 'user-speaking') {
      setStatus('waiting');
    }
  }, [micOn, status]);

  useEffect(() => {
    const prevMicOn = prevMicOnRef.current;

    if (prevMicOn && !micOn) {
      console.log("Mic turned OFF — Transcript:", transcript);

      if (transcript.trim()) {
        generateFromGemini(transcript)
          .then(res => {
            console.log("Gemini replied:", res.data.result);
            setUserGeminiResponse(res.data.result);
          })
          .catch(err => {
            console.error("Gemini API error:", err);
          });
      }
    }

    prevMicOnRef.current = micOn;
  }, [micOn, transcript]);

  return (
    <SimulationContext.Provider
      value={{
        micOn,
        setMicOn,
        status,
        setStatus,
        transcript,
        setTranscript,
        userGeminiResponse,
        setUserGeminiResponse,
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
