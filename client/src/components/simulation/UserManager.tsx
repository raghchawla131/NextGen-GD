import { useSimulation } from '@/context/SimulationContext';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useEffect } from 'react';
import MicToggleButton from './MicToggleButton';
import ParticipantAvatar from './ParticipantAvatar';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

const UserManager = () => {
  const { micOn, transcript, setStatus, userGeminiResponse, setChatHistory } = useSimulation();

  useSpeechRecognition(micOn);
  useTextToSpeech(userGeminiResponse);

  useEffect(() => {
    if (!transcript) return;
    setStatus("waiting");
  }, [transcript, setStatus]);

  useEffect(() => {
    if (!userGeminiResponse) return;
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: transcript },
      { sender: 'bot', name: 'Gemini', text: userGeminiResponse }
    ]);
  }, [userGeminiResponse]);

  return (
    <div className="relative">
      <ParticipantAvatar />
      <MicToggleButton />
    </div>
  );
};

export default UserManager;
