// types.ts
export type RecorderState = {
  status: "idle" | "recording" | "paused" | "processing" | "error";
  audioBlob: Blob | null;
  mediaRecorder: MediaRecorder | null;
  analyser: AnalyserNode | null;
};

export type AudioState = {
  isPlaying: boolean;
  downloadUrl: string | null;
  duration: number;
};
