export const generateBotReplyPrompt = (
  topic: string,
  history: string,
  latestUserInput: string,
  botStyle: string
) => `
You are participating in a group discussion on the topic: "${topic}".
Speak in an "${botStyle}" tone.
Be brief (under 20 words), natural, relevant, and do not repeat yourself.
Feel free to disagree if needed.

Conversation history:
${history}

User: ${latestUserInput}
Bot (${botStyle}):
`.trim();



export const generateIntroPrompt = (topic: string, botStyle: string) => `
You are participating in a group discussion. Start the discussion on "${topic}" in a ${botStyle} tone.
Keep it natural and conversational, under 20 words.
Only give a brief opening statement like a participant would.
`.trim();
