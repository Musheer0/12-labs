import { ConvexError, v } from "convex/values";
import { internalMutation, mutation } from "../_generated/server";
import { deleteAudio, getUploadUrl } from "../lib/s3";

export const deleteVoice = internalMutation({
  args: {
    id: v.id("voice"),
    org_id:v.string()
  },

  handler: async (ctx, args) => {
  

    const voice = await ctx.db.get(args.id);

    if (!voice) {
      throw new ConvexError("Voice not found");
    }
    if (voice.org_id !== args.org_id) {
      throw new ConvexError("Forbidden");
    }

    await ctx.db.delete(args.id);
    return { success: true ,key:voice.s3_object_key};
  },
});