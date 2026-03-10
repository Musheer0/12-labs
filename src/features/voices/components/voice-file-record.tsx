"use client";

import { IconMicrophone, IconPlayerStop, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAudioRecorder from "../hooks/use-audio-recorder";

const VoiceFileRecorder = ({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) => {
  const {
    startRecording,
    stopRecording,
    resetRecording,
    elapsedTime,
    blobToFile,
    isRecording,
    error,
  } = useAudioRecorder();
  const [file, setFile] = useState<File | null>(null);
  const removeRecording = () => {
    setFile(null);
    resetRecording();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Card className=" flex items-center justify-between px-6">
      {/* LEFT */}
      <div className="flex items-center w-full justify-between gap-4">
        {/* TIMER */}
        {!file && (
          <div className="text-sm font-mono ">{formatTime(elapsedTime)}</div>
        )}
        {/* RECORD / STOP BUTTON */}
        {!isRecording && !file && (
          <Button size={"lg"} onClick={startRecording}>
            Start Recording
            <IconMicrophone size={22} />
          </Button>
        )}

        {isRecording && (
          <Button
            size="lg"
            variant="destructive"
            onClick={() => {
              stopRecording((blob) => {
                const file = blobToFile(blob, "recording");
                setFile(file);
                onUpload(file);
              });
            }}
          >
            Stop Recording
            <IconPlayerStop size={22} />
          </Button>
        )}
      </div>

      {/* RIGHT SIDE */}

      {file && (
        <div className="flex items-center gap-2  flex-col">
          <audio controls src={URL.createObjectURL(file)} className="h-8 ">
            <track kind="captions" />
          </audio>

          <Button
            className="w-full"
            variant="destructive"
            onClick={removeRecording}
          >
            Delete Audio
            <IconTrash size={18} />
          </Button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </Card>
  );
};

export default VoiceFileRecorder;
