import { useSimulation } from '@/context/SimulationContext';
import { Mic, MicOff } from 'lucide-react';

const MicToggleButton = () => {
  const { micOn, setMicOn } = useSimulation();

  const toggleMic = () => {
    setMicOn(!micOn);
  };

  return (
    <button
      onClick={toggleMic}
      className={`rounded-full p-3 transition-all duration-200 absolute bottom-0 right-0 ${
        micOn 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {micOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
    </button>
  );
};

export default MicToggleButton;
