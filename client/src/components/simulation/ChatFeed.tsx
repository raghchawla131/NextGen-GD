import React from 'react'

const chatMessages = [
  { sender: 'bot', name: 'Alice', message: 'Hello! I’m here to assist you today.' },
  { sender: 'user', name: 'You', message: 'Hey Alice, can you tell me about AI in education?' },
  { sender: 'bot', name: 'Alice', message: 'Sure! AI is revolutionizing education by personalizing learning paths.' },
  { sender: 'user', name: 'You', message: 'That sounds interesting. What about its drawbacks?' },
  { sender: 'bot', name: 'Alice', message: 'One major concern is reduced human interaction and over-dependence on technology.' },
  { sender: 'bot', name: 'Alice', message: 'Another issue is bias in AI models if not trained properly.' },
  { sender: 'bot', name: 'Alice', message: 'AI cannot replace the emotional intelligence of human teachers.' },
  { sender: 'bot', name: 'Alice', message: 'Privacy is also a major concern when using AI tools in classrooms.' },
  { sender: 'bot', name: 'Alice', message: 'However, when used wisely, it can greatly enhance learning outcomes.' },
]

const ChatFeed = () => {
  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto h-[88vh] overflow-y-auto bg-black rounded-2xl border border-white">
      {chatMessages.map((msg, index) => (
        <div
          key={index}
          className={`
            p-4 rounded-xl max-w-[75%]
            ${msg.sender === 'bot'
              ? 'bg-neutral-800 text-white self-start'
              : 'bg-white text-black self-end ml-auto'
            }
          `}
        >
          <div className="mb-1">
            <span className={`font-semibold ${msg.sender === 'bot' ? 'text-white' : 'text-black'}`}>
              {msg.name}:
            </span>{' '}
            <span className={`font-normal ${msg.sender === 'bot' ? 'text-gray-300' : 'text-gray-700'}`}>
              {msg.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatFeed
