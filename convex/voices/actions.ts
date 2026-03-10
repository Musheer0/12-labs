import { ConvexError, v } from "convex/values";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { deleteAudio } from "../lib/s3";
export const deleteVoice = action({
  args: {
    id: v.id("voice"),
  },

  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }

    const { key } = await ctx.runMutation(
      internal.voices.internal_mutations.deleteVoice,
      { id: args.id, org_id: String(auth.org_id) },
    );
    if (key) {
      await deleteAudio(key);
    }
    return { success: true };
  },
});
