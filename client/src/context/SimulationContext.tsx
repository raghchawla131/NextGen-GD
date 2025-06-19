import React, { createContext, useContext, useEffect, useState } from "react";

interface SimulationContextType {
  micOn: boolean;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  status: 'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended';
  setStatus: React.Dispatch<React.SetStateAction<SimulationContextType['status']>>;
}

const SimulationContext = createContext<SimulationContextType | null>(null)

export const SimulationProvider = ({ children }: { children: React.ReactNode }) => {

  const [micOn, setMicOn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'waiting' | 'bots-talking' | 'user-speaking' | 'ended'>('idle');
  const [currBotIndex, setCurrBotIndex] = useState(0);

  useEffect(function handleMicStatusUpdate() {
    if (status === 'ended') return;
    if (micOn) {
      setStatus("user-speaking");
    }
    else if (!micOn && status === "user-speaking") {
      setStatus("waiting");
    }
  }, [micOn, status])

  return (
    <SimulationContext.Provider value={{ micOn, setMicOn, status, setStatus }}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider")
  return context;
}