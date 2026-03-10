"use client";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

const GenerationList = ({
  className,
  voiceId,
}: {
  className?: string;
  voiceId: string;
}) => {
  const data = useQuery(api.generations.query.getGenerations, {
    voice_id: voiceId as Id<"voice">,
  });
  // 2️⃣ Empty state
  if (!data) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">
          No generations yet. Go generate something.
        </p>
      </div>
    );
  }
  // 1️⃣ Loading state
  if (data === undefined) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">Loading generations...</p>
      </div>
    );
  }

  // 2️⃣ Empty state
  if (data.length === 0) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">
          No generations yet. Go generate something.
        </p>
      </div>
    );
  }

  // 3️⃣ Data state

  return (
    <div className={className}>
      {data.map((g) => (
        <Link
          key={g._id}
          href={`/text-to-speech/generations/${g._id}`}
          className="block"
        >
          {g.voice_name}
        </Link>
      ))}
    </div>
  );
};

export default GenerationList;
