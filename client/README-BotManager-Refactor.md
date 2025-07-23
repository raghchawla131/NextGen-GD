# BotManager Refactor - Group Discussion Simulation

## 🎯 Overview

The BotManager component has been completely refactored to create a robust, reliable group discussion simulation with proper state management, speech synthesis control, and turn-taking logic.

## 🏗️ Architecture Improvements

### 1. State Machine Pattern
- **States**: `idle` | `generating` | `speaking` | `waiting` | `paused`
- **Benefits**: Clear state transitions, predictable behavior, easier debugging

### 2. Speech Synthesis Control
- **Immediate Stop**: `synth.cancel()` stops all speech instantly when mic turns on
- **Voice Management**: Proper voice initialization with fallbacks
- **Promise-based**: Speech synthesis returns promises for better async handling

### 3. Turn-taking Logic
- **Round-robin**: Bots take turns in sequence (0 → 1 → 2 → 0...)
- **Pause/Resume**: Bot loop pauses when mic is on, resumes when mic turns off
- **Context Awareness**: Each bot responds to the last message in chat history

## 🔧 Key Components

### BotManager.tsx
```typescript
// State management
const botStateRef = useRef<BotState>('idle');
const currentBotIndexRef = useRef(0);
const isProcessingRef = useRef(false);

// Core functions
const stopAllSpeech = useCallback(() => { /* ... */ }, []);
const speakText = useCallback(async (text) => { /* ... */ }, []);
const processBotTurn = useCallback(async () => { /* ... */ }, []);
```

### SimulationContext.tsx
- **Centralized State**: All simulation state managed in one place
- **User Message Handling**: Automatic chat history updates
- **Status Transitions**: Smooth flow between user and bot interactions

### ParticipantAvatar.tsx
- **Visual Feedback**: Active speaker highlighting with ring and "Speaking" indicator
- **TypeScript Support**: Proper interfaces and prop types

## 🚀 Flow Diagram

```
1. Simulation Starts
   ↓
2. Status: 'bots-talking' → BotManager starts
   ↓
3. Bot 1 generates intro → speaks → moves to Bot 2
   ↓
4. Bot 2 replies → speaks → moves to Bot 3
   ↓
5. Bot 3 replies → speaks → back to Bot 1
   ↓
6. User clicks mic → ALL speech stops immediately
   ↓
7. User speaks → transcript processed → Gemini responds
   ↓
8. Mic off → Bot loop resumes from next bot
```

## 🛠️ Technical Improvements

### 1. Speech Synthesis
- ✅ Immediate stop when mic turns on
- ✅ Proper voice initialization
- ✅ Error handling and cleanup
- ✅ Promise-based async operations

### 2. Turn-taking
- ✅ Reliable round-robin progression
- ✅ No stuck or repeated turns
- ✅ Proper state transitions
- ✅ Context-aware responses

### 3. Chat History
- ✅ Real-time updates
- ✅ Placeholder messages during generation
- ✅ Proper message attribution
- ✅ User and bot messages handled consistently

### 4. Error Handling
- ✅ API failures don't break the loop
- ✅ Speech synthesis errors handled
- ✅ State recovery mechanisms

## 🎮 Usage

### Starting the Simulation
```typescript
// In Simulation.tsx
useEffect(() => {
  if (status === 'idle') {
    setStatus('bots-talking'); // Triggers bot loop
  }
}, [status, setStatus]);
```

### User Interaction
1. Click mic button to enable speech recognition
2. Speak your message
3. Click mic button again to stop
4. Gemini processes your input
5. Bot discussion resumes automatically

### Visual Feedback
- **Green Ring**: Currently speaking bot
- **"Speaking" Badge**: Active speaker indicator
- **Red Mic**: Mic is active (recording)
- **Blue Mic**: Mic is inactive

## 🔍 Debugging

### Console Logs
- `[BotManager] 🚀 Starting bot discussion loop`
- `[BotManager] 🎙️ Speaking: "message"`
- `[BotManager] 🛑 All speech synthesis stopped`
- `[SimulationProvider] 🎤 mic turned ON/OFF`

### State Monitoring
```typescript
console.log('Bot State:', botStateRef.current);
console.log('Current Bot:', currentBotIndexRef.current);
console.log('Mic Status:', micOn);
console.log('Simulation Status:', status);
```

## 🚨 Troubleshooting

### Bots Not Speaking
1. Check if `status === 'bots-talking'`
2. Verify `micOn === false`
3. Check browser console for errors
4. Ensure speech synthesis is supported

### Turn-taking Issues
1. Check `currentBotIndexRef.current` value
2. Verify `botStateRef.current` is 'waiting'
3. Ensure no processing is stuck (`isProcessingRef.current`)

### Speech Not Stopping
1. Verify `stopAllSpeech()` is called
2. Check if `synth.cancel()` is working
3. Ensure mic state changes are detected

## 🎯 Future Enhancements

1. **Voice Variety**: Different voices for each bot
2. **Emotion Detection**: Bot responses based on user tone
3. **Interruption Handling**: Graceful handling of user interruptions
4. **Performance Optimization**: Debounced state updates
5. **Accessibility**: Screen reader support and keyboard navigation 