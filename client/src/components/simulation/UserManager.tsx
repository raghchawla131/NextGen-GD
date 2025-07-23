import { useSimulation } from '@/context/SimulationContext';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useEffect } from 'react';
import MicToggleButton from './MicToggleButton';
import ParticipantAvatar from './ParticipantAvatar';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const UserManager = () => {
  const { micOn, transcript, userGeminiResponse } = useSimulation();

  useSpeechRecognition(micOn);
  useTextToSpeech(userGeminiResponse);

  return (
    <div className="relative">
      <ParticipantAvatar details={{ id: 0, name: 'You', role: 'Participant' }} />
      <MicToggleButton />
    </div>
  );
};

export default UserManager;
