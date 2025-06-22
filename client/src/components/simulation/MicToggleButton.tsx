import { useSimulation } from '@/context/SimulationContext';
import { Mic, MicOff } from 'lucide-react';

const MicToggleButton = () => {
  const { micOn, setMicOn } = useSimulation();

  const toggleMic = () => {
  setTimeout(() => setMicOn(!micOn), 500); // small delay to allow onresult to fire
};

  return (
    <button
      onClick={toggleMic}
      className=" bg-blue-400 rounded-full p-2 absolute bottom-0 right-0"
    >
      {micOn ? <Mic className="w-6 h-6 text-foreground" /> : <MicOff className="w-6 h-6 text-foreground" />}
    </button>
  );
};

export default MicToggleButton;
