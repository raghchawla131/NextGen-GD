import React, { useEffect, useRef } from 'react';
import { useSimulation } from '@/context/SimulationContext';

const ChatFeed = () => {
  const { chatHistory } = useSimulation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div ref={containerRef} className="p-4 space-y-4 max-w-2xl mx-auto h-[88vh] overflow-y-auto bg-black rounded-2xl border border-white">
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl max-w-[75%]
            ${msg.sender === 'bot'
              ? 'bg-neutral-800 text-white self-start'
              : 'bg-white text-black self-end ml-auto'
            }
          `}
        >
          <div className="mb-1">
            <span className={`font-semibold ${msg.sender === 'bot' ? 'text-white' : 'text-black'}`}>
              {msg.name || 'You'}:
            </span>{' '}
            <span className={`font-normal ${msg.sender === 'bot' ? 'text-gray-300' : 'text-gray-700'}`}>
              {msg.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatFeed;
