export const generateBotReplyPrompt = (
  topic: string,
  history: string,
  latestUserInput: string,
  botStyle: string
) => `
You are participating in a group discussion. Speak in a "${botStyle}" tone.
Be brief (under 40 words), natural, and relevant to the topic.
Do not repeat yourself. Feel free to disagree if needed.

Topic: ${topic}
Conversation history: ${history}

User: ${latestUserInput}
Bot:`.trim();


export const generateIntroPrompt = (topic: string, botStyle: string) => `
You are participating in a group discussion. Start the discussion on "${topic}" in a ${botStyle} tone.
Keep it natural and conversational, under 40 words.
Only give a brief opening statement like a participant would.
`.trim();
