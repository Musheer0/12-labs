"use client";

import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import CreateNewVoiceDialog from "@/features/voices/components/create-new-voice-dialog";
import { VoiceAvatar } from "@/features/voices/components/voice-avatar";
import { api } from "../../../../convex/_generated/api";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

const VoiceSelect = ({ value, onChange, className }: Props) => {
  const data = useQuery(api.voices.queries.getVoices);
  const searchparams = useSearchParams();
  const defaultVoiceId = searchparams.get("voiceId");

  // 🔥 auto select first voice if none selected
  useEffect(() => {
    if (!data) return;

    // select voice from URL
    if (!value && defaultVoiceId) {
      const exists = data.customVoices.some((v) => v._id === defaultVoiceId);

      if (exists) {
        onChange(defaultVoiceId);
        return;
      }
    }

    // fallback to first voice
    if (!value && data.customVoices.length) {
      onChange(data.customVoices[0]._id);
    }
  }, [data, value, defaultVoiceId, onChange]);
  // 1️⃣ Loading
  if (data === undefined) {
    return (
      <div className={className}>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    );
  }

  // 2️⃣ Empty state
  if (data.customVoices.length === 0) {
    return (
      <div
        className={`flex items-center justify-between border rounded-md p-3 ${className}`}
      >
        <p className="text-sm text-muted-foreground">No voices created</p>

        <CreateNewVoiceDialog>
          <button type="button" className="text-sm font-medium underline">
            Create voice
          </button>
        </CreateNewVoiceDialog>
      </div>
    );
  }

  // 3️⃣ Data
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select voice" />
      </SelectTrigger>

      <SelectContent>
        {data.customVoices.map((voice) => {
          return (
            <SelectItem key={voice._id} value={voice._id}>
              <VoiceAvatar name={voice.name} seed={voice._id} />
              {voice.name}
            </SelectItem>
          );
        })}

        <div className="border-t my-1" />
      </SelectContent>
    </Select>
  );
};

export default VoiceSelect;
