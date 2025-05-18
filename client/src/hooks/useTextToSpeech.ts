import { useEffect } from "react";

export function useTextToSpeech(text: string | null) {
  useEffect(() => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    // Optional: customize voice, pitch, rate here
    // utterance.voice = speechSynthesis.getVoices()[0];
    // utterance.pitch = 1;
    // utterance.rate = 1;

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);
}