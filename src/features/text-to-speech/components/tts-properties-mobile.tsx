"use client";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import VoiceSelect from "@/features/text-to-speech/components/voice-select";
import { useIsMobile } from "@/hooks/use-mobile";
import { sliders } from "../data/sliders";

const TextToSpeechPropertiesPanelMobile = () => {
  const { register, watch, setValue } = useFormContext();
  const router = useRouter();
  const isMobile = useIsMobile();

  const PanelContent = (
    <div className="flex-1 border-l p-6 bg-accent/20">
      <p className="text-center text-lg font-semibold">Voice Properties</p>
      <div className="flex flex-col py-2 gap-2">
        <VoiceSelect
          className="w-full"
          value={watch("voiceId")}
          onChange={(e) => {
            setValue("voiceId", e);
            router.push(`?voiceId=${e}`);
          }}
        />

        {sliders.map((slider) => (
          <div className="w-full py-3" key={slider.id}>
            <p className="text-sm font-semibold">{slider.label}</p>

            <div className="flex w-full text-sm text-muted-foreground py-0.5 items-center justify-between">
              <p>{slider.leftLabel}</p>
              <p>{slider.rightLabel}</p>
            </div>

            <Slider
              defaultValue={[slider.defaultValue]}
              step={slider.step}
              max={slider.max as any}
              min={slider.min as any}
              {...register(slider.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // mobile sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Settings className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom">{PanelContent}</SheetContent>
      </Sheet>
    );
  }
};

export default TextToSpeechPropertiesPanelMobile;
