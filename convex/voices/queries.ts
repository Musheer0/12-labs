/* This TypeScript code snippet is defining two functions `getVoiceById` and `getVoices` that are used
to query voice data. Here is a breakdown of what each part of the code is doing: */
import { ConvexError, v } from 'convex/values'
import {query} from '../_generated/server'
export const getVoiceById = query({
    args:{
        id:v.id("voice")
    },
    handler:async(ctx,args)=>{
        const auth =await ctx.auth.getUserIdentity()
        if(!auth || !auth.subject|| !auth.org_id) throw new ConvexError({
            code:"Unauthorized"
        })
        const voice = await ctx.db.get("voice",args.id);
        if(!voice) throw new ConvexError("not found")
        if(!voice.org_id===auth.org_id)throw new ConvexError("forbidden")
        return voice
    }
})

export const getVoices = query({
  handler: async (ctx) => {
    const auth = await ctx.auth.getUserIdentity();

    if (!auth || !auth.subject || !auth.org_id) {
      throw new ConvexError("Unauthorized");
    }
    const orgId = auth.org_id as string
    const voices = await ctx.db
      .query("voice")
      .withIndex("by_org", (q) => q.eq("org_id", orgId))
      .collect();

    const systemVoices = voices.filter(v => v.type === "system");
    const customVoices = voices.filter(v => v.type === "custom");

    return {
      systemVoices,
      customVoices
    };
  },
});