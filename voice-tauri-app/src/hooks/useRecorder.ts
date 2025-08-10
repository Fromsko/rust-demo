// hooks/useRecorder.ts
import { useRef, useState } from "react";
import { RecorderState } from "../types";

const initialState: RecorderState = {
  status: "idle",
  audioBlob: null,
  mediaRecorder: null,
  analyser: null,
};

declare var window: Window & typeof globalThis & windowTop;

declare interface windowTop {
  webkitAudioContext: void;
}

export const useRecorder = () => {
  const [recorderState, setRecorderState] =
    useState<RecorderState>(initialState);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      let audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        setRecorderState((prev: any) => ({
          ...prev,
          status: "processing",
          audioBlob,
          analyser: null,
          mediaRecorder: null,
        }));
      };

      mediaRecorder.start();
      setRecorderState({
        status: "recording",
        mediaRecorder,
        audioBlob: null,
        analyser,
      });
    } catch (err) {
      setRecorderState({ ...initialState, status: "error" });
    }
  };

  const stopRecording = () => {
    recorderState.mediaRecorder?.stop();
  };

  const pauseRecording = () => {
    recorderState.mediaRecorder?.pause();
    setRecorderState((prev: any) => ({ ...prev, status: "paused" }));
  };

  const resumeRecording = () => {
    recorderState.mediaRecorder?.resume();
    setRecorderState((prev: any) => ({ ...prev, status: "recording" }));
  };

  return {
    recorderState,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
  };
};
