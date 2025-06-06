import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef } from "react";

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const ChatHistory = ({ history }: { history: Message[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);


  return (
    <ScrollArea className="h-96 w-full rounded-xl border border-border mt-14 bg-background shadow-sm p-6">
      <div
        ref={scrollRef}
        className="flex flex-col space-y-4 overflow-y-auto max-h-full"
      >
        {history.length === 0 && (
          <p className="text-muted-foreground text-center italic select-none">
            No messages yet
          </p>
        )}

        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] rounded-lg px-4 py-3 break-words
              ${msg.role === 'user'
                ? 'self-end bg-primary text-primary-foreground shadow-md'
                : 'self-start bg-secondary text-secondary-foreground shadow-sm'
              }
            `}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatHistory;
