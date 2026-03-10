import PageHeader from "@/components/page-header";
import GeneratedVoicePlayer from "@/features/text-to-speech/components/generated-voice-player";
import { TextInputPanel } from "@/features/text-to-speech/components/text-input-pannel";
import TextToSpeechFormProvider from "@/features/text-to-speech/components/text-to-speech-form-provider";
import TextToSpeechPropertiesPanel from "@/features/text-to-speech/components/text-to-speech-properties-pannel";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col  min-h-screen flex-1">
      <PageHeader title="Text to Speech" />
      <TextToSpeechFormProvider>
        <div className="flex flex-1 flex-col  h-full w-full gap-1">
          <div className="flex flex-2 w-full">
            <TextInputPanel />
            <TextToSpeechPropertiesPanel />
          </div>
          <GeneratedVoicePlayer />
        </div>
      </TextToSpeechFormProvider>
    </div>
  );
};

export default page;
