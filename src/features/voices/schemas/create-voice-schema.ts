import z from "zod";

export const createVoiceSchema = z.object({
  name: z.string().max(64),
  description: z.string().max(500).optional(),
});
export type tcreateVoiceSchema = z.infer<typeof createVoiceSchema>;
