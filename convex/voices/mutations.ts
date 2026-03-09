import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";
import { deleteAudio, getUploadUrl } from "../lib/s3";

export const deleteVoice = mutation({
  args: {
    id: v.id("voice"),
  },

  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }

    const voice = await ctx.db.get(args.id);

    if (!voice) {
      throw new ConvexError("Voice not found");
    }

    const orgId = String(auth.org_id);

    if (voice.org_id !== orgId) {
      throw new ConvexError("Forbidden");
    }

    await ctx.db.delete(args.id);
    if(voice.s3_object_key){
      await deleteAudio(voice.s3_object_key!)
    }
    return { success: true };
  },
});
export const updateVoiceName = mutation({
  args: {
    id: v.id("voice"),
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }

    const voice = await ctx.db.get(args.id);

    if (!voice) {
      throw new ConvexError("Voice not found");
    }

    const orgId = String(auth.org_id);

    if (voice.org_id !== orgId) {
      throw new ConvexError("Forbidden");
    }

    await ctx.db.patch(args.id, {
      name: args.name,
    });

    return { success: true };
  },
});
export const createVoiceMeta = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }

    const orgId = String(auth.org_id);
    const voiceId = await ctx.db.insert("voice", {
      name: args.name,
      org_id: orgId,
      creator_id: auth.subject,
      description: args.description,
      s3_object_key: null,
      type: "custom",
    });
    await ctx.db.patch("voice", voiceId, {
      s3_object_key: `voices/org/${orgId}/${voiceId}`,
    });
    const key = `voices/org/${orgId}/${voiceId}`;
    const signedUrl = await getUploadUrl(key);
    return { voiceId, signedUrl };
  },
});
