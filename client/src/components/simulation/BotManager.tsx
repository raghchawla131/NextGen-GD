import React, { useEffect, useRef, useCallback } from 'react';
import ParticipantAvatar from './ParticipantAvatar';
import { generateFromGemini } from '@/utils/geminiAPI';
import { useSimulation } from '@/context/SimulationContext';
import { generateBotReplyPrompt, generateIntroPrompt } from '@/utils/prompts';

interface Bot {
  id: number;
  name: string;
  role: string;
}

interface BotsProp {
  bots: Bot[];
}

// State machine states
type BotState = 'idle' | 'generating' | 'speaking' | 'waiting' | 'paused';

const BotManager = ({ bots }: BotsProp) => {
  const {
    micOn,
    status,
    setStatus,
    botGeminiResponses,
    setBotGeminiResponses,
    chatHistory,
    setChatHistory,
    topic,
  } = useSimulation();

  // Refs for state management
  const currentBotIndexRef = useRef(0);
  const botStateRef = useRef<BotState>('idle');
  const introDoneRef = useRef(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isProcessingRef = useRef(false);

  // Debug function to test speech synthesis
  const testSpeechSynthesis = useCallback(() => {
    const synth = window.speechSynthesis;
    
    if (synth) {
      const testUtterance = new SpeechSynthesisUtterance('Test speech synthesis');
      synth.speak(testUtterance);
    }
  }, []);

  // Speech synthesis control
  const stopAllSpeech = useCallback(() => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Immediately stop all speech
    speechSynthesisRef.current = null;
  }, []);

  // Initialize speech synthesis voices
  const initializeVoices = useCallback(async (): Promise<SpeechSynthesisVoice | null> => {
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    
    if (!voices.length) {
      await new Promise<void>((resolve) => {
        const onVoicesChanged = () => {
          voices = synth.getVoices();
          synth.removeEventListener('voiceschanged', onVoicesChanged);
          resolve();
        };
        synth.addEventListener('voiceschanged', onVoicesChanged);
      });
    }

    // Try to find a good English voice
    const preferred = voices.find(v => 
      v.name.includes('Google US English') || 
      v.name.includes('English') || 
      v.lang.startsWith('en')
    );
    
    return preferred || voices[0] || null;
  }, []);

  // Speak text with proper voice setup
  const speakText = useCallback(async (text: string): Promise<void> => {
    const synth = window.speechSynthesis;
    
    // Check if speech synthesis is supported
    if (!synth) {
      throw new Error('Speech synthesis not supported');
    }
    
    // Cancel any existing speech
    synth.cancel();
    
    // Check if speech synthesis is paused (browser might pause it)
    if (synth.paused) {
      synth.resume();
    }
    
    const voice = await initializeVoices();
    
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.pitch = 1;
    utterance.rate = 0.8; // Slightly slower for better clarity
    utterance.volume = 1;
    
    speechSynthesisRef.current = utterance;
    
    return new Promise((resolve, reject) => {
      let hasResolved = false;
      
      const resolveOnce = () => {
        if (!hasResolved) {
          hasResolved = true;
          speechSynthesisRef.current = null;
          resolve();
        }
      };
      
      const rejectOnce = (error: any) => {
        if (!hasResolved) {
          hasResolved = true;
          speechSynthesisRef.current = null;
          reject(error);
        }
      };
      
      // Add a shorter timeout for shorter texts
      const textLength = text.length;
      const timeoutDuration = Math.max(3000, textLength * 100); // 3 seconds minimum, 100ms per character
      
      const timeoutId = setTimeout(() => {
        if (!hasResolved) {
          resolveOnce();
        }
      }, timeoutDuration);
      
      utterance.onstart = () => {
        clearTimeout(timeoutId); // Clear timeout once speech actually starts
      };
      
      utterance.onend = () => {
        clearTimeout(timeoutId);
        resolveOnce();
      };
      
      utterance.onerror = (error) => {
        clearTimeout(timeoutId);
        rejectOnce(error);
      };
      
      try {
        // Ensure we're not in a suspended state
        if (synth.speaking) {
          synth.cancel();
        }
        
        // Try to speak
        synth.speak(utterance);
        
        // Check if speech actually started after a short delay
        setTimeout(() => {
          if (!synth.speaking && !hasResolved) {
            // Try again with a different approach
            synth.cancel();
            const retryUtterance = new SpeechSynthesisUtterance(text);
            retryUtterance.rate = 1;
            retryUtterance.pitch = 1;
            synth.speak(retryUtterance);
          }
        }, 500);
        
      } catch (error) {
        clearTimeout(timeoutId);
        rejectOnce(error);
      }
    });
  }, [initializeVoices]);

  // Generate bot response using Gemini
  const generateBotResponse = useCallback(async (bot: Bot, isIntro: boolean = false): Promise<string> => {
    let prompt: string;
    
    if (isIntro) {
      prompt = generateIntroPrompt(topic, bot.role);
    } else {
      const historyStr = chatHistory.map(m => `${m.name || 'User'}: ${m.text}`).join('\n');
      const lastMessage = chatHistory[chatHistory.length - 1]?.text || '';
      prompt = generateBotReplyPrompt(topic, historyStr, lastMessage, bot.role);
    }

    const response = await generateFromGemini(prompt);
    return response.data.result;
  }, [topic, chatHistory]);

  // Process a single bot's turn
  const processBotTurn = useCallback(async () => {
    if (isProcessingRef.current || botStateRef.current !== 'waiting') {
      return;
    }

    isProcessingRef.current = true;
    botStateRef.current = 'generating';

    try {
      const currentBot = bots[currentBotIndexRef.current];
      const isIntro = !introDoneRef.current;

      // Check if this is a response to user input
      const lastMessage = chatHistory[chatHistory.length - 1];
      const isResponseToUser = lastMessage?.sender === 'user';

      // Add placeholder message
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        name: currentBot.name, 
        text: '(thinking...)' 
      }]);

      // Generate response
      const response = await generateBotResponse(currentBot, isIntro);

      // Update chat history with real response
      setChatHistory(prev => 
        prev.map((msg, idx, arr) => 
          idx === arr.length - 1 ? { ...msg, text: response } : msg
        )
      );

      if (isIntro) {
        introDoneRef.current = true;
      }

      // Check if mic is on before speaking
      if (micOn) {
        botStateRef.current = 'paused';
        isProcessingRef.current = false;
        return;
      }

      // Speak the response
      botStateRef.current = 'speaking';
      
      try {
        await speakText(response);
      } catch (speechError) {
        // Continue even if speech fails
      }

      // Update bot responses and move to next bot
      setBotGeminiResponses(prev => [...prev, response]);
      currentBotIndexRef.current = (currentBotIndexRef.current + 1) % bots.length;
      
      botStateRef.current = 'waiting';
      isProcessingRef.current = false;

      // Continue the loop if mic is still off
      if (!micOn && status === 'bots-talking') {
        // If this was a response to user, continue with next bot
        // If this was part of normal round-robin, continue with next bot
        setTimeout(() => processBotTurn(), 2000);
      }

    } catch (error) {
      botStateRef.current = 'waiting';
      isProcessingRef.current = false;
    }
  }, [bots, micOn, status, generateBotResponse, speakText, setChatHistory, setBotGeminiResponses, chatHistory]);

  // Handle mic state changes
  useEffect(() => {
    if (micOn) {
      // Stop all speech immediately when mic turns on
      stopAllSpeech();
      botStateRef.current = 'paused';
    } else if (status === 'bots-talking' && botStateRef.current === 'paused') {
      // Resume bot loop when mic turns off
      botStateRef.current = 'waiting';
      setTimeout(() => processBotTurn(), 500); // Small delay before resuming
    }
  }, [micOn, status, stopAllSpeech, processBotTurn]);

  // Start bot loop when status changes to 'bots-talking'
  useEffect(() => {
    if (status === 'bots-talking' && !micOn && botStateRef.current === 'idle') {
      botStateRef.current = 'waiting';
      processBotTurn();
    }
  }, [status, micOn, processBotTurn]);

  // Handle user messages in chat history - this triggers the next bot to respond
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    
    // If the last message is from user and we're in bot-talking mode, have the next bot respond
    if (lastMessage?.sender === 'user' && status === 'bots-talking' && !micOn && botStateRef.current === 'waiting') {
      // The next bot in the sequence will respond to the user
      setTimeout(() => processBotTurn(), 1000);
    }
  }, [chatHistory, status, micOn, processBotTurn]);

  // Prevent overlapping bot turns - ensure only one bot speaks at a time
  useEffect(() => {
    if (botStateRef.current === 'speaking' && isProcessingRef.current) {
      return;
    }
  }, [botStateRef.current, isProcessingRef.current]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllSpeech();
    };
  }, [stopAllSpeech]);

  return (
    <div className='w-full flex flex-col items-center'>
      {/* Debug Test Button */}
      <button 
        onClick={testSpeechSynthesis}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Speech Synthesis
      </button>
      
      {/* Bot Avatars */}
      <div className='w-full flex justify-around'>
        {bots.map((bot, index) => (
          <div key={bot.id}>
            <ParticipantAvatar 
              details={bot} 
              isActive={index === currentBotIndexRef.current && botStateRef.current === 'speaking'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotManager;
