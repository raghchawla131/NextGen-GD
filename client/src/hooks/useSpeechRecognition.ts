import { useEffect, useRef, useState } from 'react';

// Type fixes
type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognition;
  }
}

export const useSpeechRecognition = (isActive: boolean) => {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech Recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isActive) {
      setTranscript('');
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isActive]);

  return { transcript };
};
