import { useEffect, useRef } from "react";
import { useSimulation } from "@/context/SimulationContext";

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognition;
  }
}

export const useSpeechRecognition = (isActive: boolean) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { setTranscript } = useSimulation();
  const transcriptRef = useRef(""); // Store interim result until recognition ends

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech Recognition not supported");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      console.log("🎤 User said:", result);
      transcriptRef.current = result; // Store result temporarily
    };

    recognition.onerror = (event: any) => {
      console.error("❌ Speech recognition error:", event.error);
    };

    recognition.onspeechend = () => {
      console.log("🧘 Speech ended. Stopping...");
      recognition.stop();
    };

    recognition.onend = () => {
      console.log("🛑 Speech recognition ended.");
      // Finalize and update context transcript after recognition completes
      setTranscript(transcriptRef.current);
    };

    recognitionRef.current = recognition;
  }, [setTranscript]);

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isActive) {
      transcriptRef.current = "";
      setTranscript(""); // Clear before starting
      recognition.start();
    } else {
      recognition.stop(); // Still allow manual stop
    }
  }, [isActive, setTranscript]);
};
