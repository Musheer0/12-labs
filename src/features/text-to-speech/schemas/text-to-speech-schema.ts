import { z } from "zod";

export const createVoiceSchema = z.object({
  prompt: z.string(),
  voiceId: z.string(),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});
export type tcreateVoiceSchema = z.infer<typeof createVoiceSchema>;
