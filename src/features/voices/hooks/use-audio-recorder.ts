import { useCallback, useRef, useState } from "react";
import type RecordRTCType from "recordrtc";

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<RecordRTCType | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const _containerRef = useRef<HTMLDivElement>(null);
  const _micStreamRef = useRef<{ onDestroy: () => void } | null>(null);
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.destroy();
      recorderRef.current = null;
    }

    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) {
        track.stop();
      }
      streamRef.current = null;
    }
  }, []);
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setAudioBlob(null);
      setElapsedTime(0);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const { default: RecordRtc, StereoAudioRecorder } = await import(
        "recordrtc"
      );
      const recorder = new RecordRtc(stream, {
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        mimeType: "audio/wav",
        desiredSampRate: 4100,
      });
      recorderRef.current = recorder;
      recorder.startRecording();
      setIsRecording(true);
      const startTime = Date.now();

      timerRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 200);
    } catch (err) {
      cleanup();

      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setError(
          "Microphone access denied. Please allow microphone permission.",
        );
      } else {
        setError("Failed to access microphone.");
      }
    }
  }, [cleanup]);
  const stopRecording = useCallback(
    (onBlob?: (blob: Blob) => void) => {
      const recorder = recorderRef.current;
      if (!recorder) return;

      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        setAudioBlob(blob);
        setIsRecording(false);

        cleanup();
        onBlob?.(blob);
      });
    },
    [cleanup],
  );
  const resetRecording = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setElapsedTime(0);
    setAudioBlob(null);
    setError(null);
  }, [cleanup]);
  function blobToFile(blob: Blob, filename: string) {
    return new File([blob], filename, { type: blob.type });
  }
  return {
    isRecording,
    elapsedTime,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    resetRecording,
    blobToFile,
  };
};

export default useAudioRecorder;
