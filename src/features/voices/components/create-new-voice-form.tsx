"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileFromS3 } from "@/lib/upload-file-from-s3";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import {
  createVoiceSchema,
  type tcreateVoiceSchema,
} from "../schemas/create-voice-schema";
import VoiceUpload from "./voice-upload";

const CreateNewVoiceForm = ({
  setIsPending,
  dailogState,
}: {
  setIsPending: (d: boolean) => void;
  dailogState: (d: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const mutate = useMutation(api.voices.mutations.createVoiceMeta);
  const deleteMutate = useAction(api.voices.actions.deleteVoice);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const form = useForm<tcreateVoiceSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createVoiceSchema),
  });
  async function onSubmit(data: tcreateVoiceSchema) {
    if (!data.name) {
      form.setError("name", { message: "name is required" });
      return;
    }
    if (data.name.length < 1) {
      form.setError("name", { message: "name is to short" });
      return;
    }
    if (!file) {
      toast.error("please upload or record an audio file ");
      return;
    }
    try {
      setIsPending(true);
      setPending(true);
      const { signedUrl, voiceId } = await mutate(data);
      setVoiceId(voiceId);
      console.log(signedUrl);
      await uploadFileFromS3(signedUrl.url, signedUrl.fields, file);
    } catch (error) {
      if (voiceId) {
        await deleteMutate({ id: voiceId as Id<"voice"> });
      }
      if (error instanceof ConvexError) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsPending(false);
      setPending(false);
      dailogState(false);
    }
  }

  return (
    <div className="py-2">
      <VoiceUpload onUpload={setFile} />
      <form id="create-voice-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            disabled={pending}
            name="name"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Voice Name
                  </FieldLabel>
                  <Input
                    disabled={pending}
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Voice Name"
                    autoComplete="off"
                    className="h-auto! py-2.5"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            disabled={pending}
            name="description"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Voice Description
                  </FieldLabel>
                  <Textarea
                    disabled={pending}
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Voice Description (optional)"
                    autoComplete="off"
                    className="h-auto! py-2.5 min-h-[130px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        {error && (
          <p className="text-destructive flex items-center gap-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default CreateNewVoiceForm;
