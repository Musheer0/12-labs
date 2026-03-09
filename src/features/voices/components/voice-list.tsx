"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import VoiceCard from "./voice-card";

const VoiceList = ({ className }: { className?: string }) => {
  const data = useQuery(api.voices.queries.getVoices);

  // 1️⃣ Loading state
  if (data === undefined) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">Loading voices...</p>
      </div>
    );
  }

  // 2️⃣ Empty state
  if (data.customVoices.length === 0) {
    return (
      <div className={className}>
        <p className="text-muted-foreground">
          No voices yet. Go create one.
        </p>
      </div>
    );
  }

  // 3️⃣ Data state
  return (
    <div className={className}>
      {data.customVoices.map((v) => (
        <VoiceCard voice={v} key={v._id} />
      ))}
    </div>
  );
};

export default VoiceList;