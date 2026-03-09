"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import VoiceCard from "./voice-card";
import { ModeToggle } from "@/components/mode-toggle";

const VoiceList = ({className}:{className?:string}) => {
  const data = useQuery(api.voices.queries.getVoices);
  if (data)
    return (
      <div className={className}>
        {data.customVoices.map((v) => {
          return (
            <VoiceCard voice={v} />
          );
        })}
      </div>
    );
};

export default VoiceList;
