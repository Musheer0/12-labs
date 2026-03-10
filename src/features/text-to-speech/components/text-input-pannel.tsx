"use client";

import { Coins } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";
import GenerateButton from "./generate-button";
import GenerationListMobile from "./generation-list-mobile";
import TextToSpeechPropertiesPanelMobile from "./tts-properties-mobile";

export function TextInputPanel() {
  const { register, watch } = useFormContext();
  const text = watch("prompt");
  return (
    <div className="flex  h-full  min-h-0 flex-col flex-3">
      {/* Text input area */}
      <div className="relative min-h-0 flex-1">
        <Textarea
          {...register("prompt")}
          placeholder="Start typing or paste your text here..."
          className="absolute inset-0 border-none resize-none border-0 bg-transparent! p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
          maxLength={TEXT_MAX_LENGTH}
        />
        {/* Bottom fade overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>
      {/* Action bar */}
      <div className="shrink-0 p-4 lg:p-6">
        {/* Mobile layout */}
        <div className="flex flex-col gap-3  lg:hidden">
          <div className="flex items-center gap-2">
            <TextToSpeechPropertiesPanelMobile />
            <GenerationListMobile />
          </div>
          <div className="flex items-center  gap-2">
            <GenerateButton />
          </div>
        </div>
        {/* Desktop layout */}
        <div className="hidden items-center justify-between lg:flex">
          <Badge variant="outline" className="gap-1.5 border-dashed">
            <Coins className="size-3 text-chart-5" />
            <span className="text-xs">
              <span className="tabular-nums">
                ${(text?.length * COST_PER_UNIT).toFixed(4)}
              </span>
              &nbsp; estimated
            </span>
          </Badge>
          <div className="flex items-center gap-3">
            <p className="text-xs tracking-tight">
              {text.length.toLocaleString()}
              <span className="text-muted-foreground">
                &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()} characters
              </span>
            </p>
            <GenerateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
