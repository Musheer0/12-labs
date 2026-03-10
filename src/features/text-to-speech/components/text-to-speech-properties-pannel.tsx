"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceSelect from "@/features/text-to-speech/components/voice-select";
import { useIsMobile } from "@/hooks/use-mobile";
import { sliders } from "../data/sliders";
import GenerationList from "./generation-lists";

const TextToSpeechPropertiesPanel = () => {
  const { register, watch, setValue } = useFormContext();
  const searchparams = useSearchParams();
  const defaultVoiceId = searchparams.get("voiceId");

  const voiceId = watch("voiceId");
  const router = useRouter();
  const isMobile = useIsMobile();
  if (!isMobile)
    return (
      <div className="flex-1 border-l  p-2 bg-accent/20">
        <Tabs defaultValue="settings" className="w-[400px]">
          <TabsList className="w-full p-0 mx-auto h-auto!">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <div className="flex flex-col py-2 gap-2">
              <VoiceSelect
                className="w-full"
                value={defaultVoiceId || watch("voiceId")}
                onChange={(e) => {
                  setValue("voiceId", e);
                  router.push(`?voiceId=${e}`);
                }}
              />
              {sliders.map((slider) => {
                return (
                  <div className="w-full py-3" key={slider.id}>
                    <p className="text-sm  font-semibold">{slider.label}</p>
                    <div className="flex w-full text-sm text-muted-foreground py-0.5 items-center justify-between">
                      <p>{slider.leftLabel}</p>
                      <p>{slider.rightLabel}</p>
                    </div>
                    <Slider
                      defaultValue={[slider.defaultValue]}
                      step={slider.step as any}
                      max={slider.max as any}
                      min={slider.min as any}
                      className=""
                      {...register(slider.id)}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="history">
            <GenerationList voiceId={voiceId} />
          </TabsContent>
        </Tabs>
      </div>
    );
};

export default TextToSpeechPropertiesPanel;
