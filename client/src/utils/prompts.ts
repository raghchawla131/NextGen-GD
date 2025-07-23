// utils/prompts.ts
export const generateBotReplyPrompt = (
  topic: string,
  history: string,
  latestUserInput: string,
  botStyle: string
) => `
You're one of the participants in a group discussion on: "${topic}".
Your speaking style is: "${botStyle}".
Respond naturally and concisely (under 10 words). Avoid repetition.
You can agree or disagree with others — keep it relevant.

Previous discussion:
${history}

Latest speaker:
${latestUserInput}

Your response (${botStyle}):
`.trim();

export const generateIntroPrompt = (topic: string, botStyle: string) => `
You are the first speaker in a group discussion on the topic: "${topic}".
Speak in a "${botStyle}" tone.
Give a natural, conversational opening (under 10 words) — like a participant starting the discussion.
`.trim();
