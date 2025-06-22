import React, { useEffect, useRef, useState } from 'react';
import ParticipantAvatar from './ParticipantAvatar';
import { generateFromGemini } from '@/utils/geminiAPI';
import { useSimulation } from '@/context/SimulationContext';

interface Bot {
  id: number;
  name: string;
  role: string;
}

interface BotsProp {
  bots: Bot[];
}

const BotManager = ({ bots }: BotsProp) => {
  const {
    status,
    setStatus,
    botGeminiResponses,
    setBotGeminiResponses,
  } = useSimulation();

  const botIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    if (status !== 'bots-talking') return;

    const synth = window.speechSynthesis;
    if (synth.speaking || isSpeakingRef.current) return;

    const activeBot = bots[botIndexRef.current];
    const prompt = `${activeBot.name} (${activeBot.role}): reply to the conversation in one sentence`;

    isSpeakingRef.current = true;

    generateFromGemini(prompt)
      .then((res) => {
        const response = res.data.result;
        console.log(`🤖 ${activeBot.name}: ${response}`);
        setBotGeminiResponses((prev) => [...prev, response]);

        const utterance = new SpeechSynthesisUtterance(response);

        // Optional: assign a preferred voice
        const voices = synth.getVoices();
        const preferred = voices.find((v) => v.name === 'Google US English');
        if (preferred) utterance.voice = preferred;

        utterance.pitch = 1;
        utterance.rate = 1;

        // After speaking, delay 300ms and move to next bot
        utterance.onend = () => {
          setTimeout(() => {
            isSpeakingRef.current = false;
            botIndexRef.current = (botIndexRef.current + 1) % bots.length;
            setStatus('bots-talking'); // re-trigger for next bot
          }, 300);
        };

        synth.speak(utterance);
      })
      .catch((err) => {
        console.error("Gemini error:", err);
        isSpeakingRef.current = false;
        setStatus('waiting'); // fallback
      });
  }, [status, bots, setBotGeminiResponses, setStatus]);

  return (
    <div className='w-full flex justify-around'>
      {bots.map((bot) => (
        <div key={bot.id}>
          <ParticipantAvatar details={bot} />
        </div>
      ))}
    </div>
  );
};

export default BotManager;
