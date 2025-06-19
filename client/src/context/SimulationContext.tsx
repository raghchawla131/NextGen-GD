import React, { createContext, useContext, useState } from "react";

interface SimulationContextType {
  micOn: boolean;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SimulationContext = createContext<SimulationContextType | null>(null)

export const SimulationProvider = ({children}: {children: React.ReactNode}) => {
  const[micOn, setMicOn] = useState(false);
  return (
    <SimulationContext.Provider value={{micOn, setMicOn}}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if(!context) throw new Error("useSimulation must be used within a SimulationProvider")
  return context;
}