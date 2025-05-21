import { useEffect } from "react";

export function useTextToSpeech(text: string | null) {
  useEffect(() => {
    if (!text) return;

    const synth = window.speechSynthesis;
    let voices = synth.getVoices();

    // Find Google US English
    const preferredVoice = voices.find(v => v.name === "Google US English");

    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.pitch = 1;
    utterance.rate = 1;

    synth.speak(utterance);

    return () => {
      synth.cancel();
    };
  }, [text]);
}
