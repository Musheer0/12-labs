"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  createVoiceSchema,
  type tcreateVoiceSchema,
} from "../schemas/text-to-speech-schema";

const default_values: tcreateVoiceSchema = {
  prompt: "",
  repetitionPenalty: 1.2,
  temperature: 0.8,
  topK: 1000,
  topP: 0.95,
  voiceId: "",
};
const TextToSpeechFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useForm({
    resolver: zodResolver(createVoiceSchema),
    defaultValues: default_values,
  });
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="w-full flex-1 h-full"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default TextToSpeechFormProvider;
