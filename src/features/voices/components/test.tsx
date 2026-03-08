"use client";

import useAudioRecorder from "@/features/voices/hooks/use-audio-recorder";

export default function Recorder() {
  const recorder = useAudioRecorder();

  return (
    <div>
      <h2>Recorder</h2>

      {recorder.error && <p>{recorder.error}</p>}

      <p>Time: {recorder.elapsedTime}s</p>

      {!recorder.isRecording ? (
        <button onClick={recorder.startRecording}>Start</button>
      ) : (
        <button onClick={() => recorder.stopRecording()}>Stop</button>
      )}

      {recorder.audioBlob && (
        <a
          href={URL.createObjectURL(recorder.audioBlob)}
          download="recording.wav"
        >
          Download Recording
        </a>
      )}
    </div>
  );
}