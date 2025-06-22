import { useEffect } from "react";

export function useTextToSpeech(text: string | null) {
  useEffect(() => {
    if (!text) return;

    const synth = window.speechSynthesis;

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      synth.speak(utterance);
    };

    // Wait a bit if voices haven't loaded yet
    if (synth.getVoices().length === 0) {
      const id = setTimeout(speak, 100); // small delay to let voices load
      return () => clearTimeout(id);
    } else {
      speak();
    }

    return () => synth.cancel();
  }, [text]);
}
