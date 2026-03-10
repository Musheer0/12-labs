import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";
export const getGenerations = query({
  args: {
    voice_id: v.optional(v.id("voice")),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }

    const orgId = auth.org_id as string;
    if (!args.voice_id) return null;

    const generations = await ctx.db
      .query("generation")
      .withIndex("by_ord_voice_id", (q) =>
        q.eq("org_id", orgId).eq("voice_id", args.voice_id!),
      )
      .order("desc")
      .collect();

    return generations.map(({ s3_object_key, ...rest }) => rest);
  },
});
