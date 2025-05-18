// src/components/simulation/MicToggleButton.tsx
import { Mic, MicOff } from 'lucide-react';

interface MicToggleButtonProps {
  micOn: boolean;
  toggleMic: () => void;
}

const MicToggleButton: React.FC<MicToggleButtonProps> = ({ micOn, toggleMic }) => {
  return (
    <div
      className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 rounded-full p-2 transition-all duration-300 ease-in-out w-8 h-8 flex items-center justify-center"
      onClick={toggleMic}
    >
      <Mic
        className={`text-white w-4 h-4 absolute transition-all duration-300 ease-in-out ${micOn ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
      />
      <MicOff
        className={`text-white w-4 h-4 absolute transition-all duration-300 ease-in-out ${micOn ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
      />
    </div>
  );
};

export default MicToggleButton;
