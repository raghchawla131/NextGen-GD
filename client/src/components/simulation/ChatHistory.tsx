import { ScrollArea } from "@radix-ui/react-scroll-area";

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const ChatHistory = ({ history }: { history: Message[] }) => {
  return (
    <ScrollArea className="h-64 w-full rounded-md border p-4">
      <div className="space-y-3">
        {history.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatHistory;