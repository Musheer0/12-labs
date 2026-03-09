import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  voice: defineTable({
    name: v.string(),
    org_id: v.string(),
    s3_object_key: v.nullable(v.string()),
    type: v.union(v.literal("system"), v.literal("custom")),
    description: v.optional(v.string()),
    creator_id: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_org", ["org_id"])
    .index("by_org_name", ["org_id", "name"]),
  generation: defineTable({
    org_id: v.string(),
    creator_id: v.string(),
    prompt: v.string(),
    voice_name: v.string(),
    void_id: v.id("voice"),
    s3_object_key: v.string(),
    temperature: v.float64(),
    topP: v.float64(),
    topK: v.number(),
    repetitionPenalty: v.number(),
    status: v.union(
      v.literal("success"),
      v.literal("pending"),
      v.literal("error"),
    ),
  }).index("by_org", ["org_id"]),
});
