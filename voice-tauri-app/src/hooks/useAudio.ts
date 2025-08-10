// hooks/useAudio.ts
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import { useEffect, useRef, useState } from "react";
import { AudioState } from "../types";
import { audioBufferToWav, formatTime } from "../utils/audioUtils";

const initialState: AudioState = {
  isPlaying: false,
  downloadUrl: null,
  duration: 0,
};

export const useAudio = (audioBlob: Blob | null) => {
  const [audioState, setAudioState] = useState<AudioState>(initialState);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const processAudio = async (blob: Blob) => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.AudioContext)();
      }
      try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );
        audioBufferRef.current = buffer;
        const wavBlob = audioBufferToWav(buffer);
        const url = URL.createObjectURL(wavBlob);
        setAudioState({
          ...initialState,
          downloadUrl: url,
          duration: buffer.duration,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (audioBlob) {
      processAudio(audioBlob);
    }
  }, [audioBlob]);

  const playAudio = async () => {
    const buffer = audioBufferRef.current;
    if (!buffer || audioState.isPlaying) return;

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const source = audioContextRef.current!.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current!.destination);
    source.start();

    setAudioState((prev) => ({ ...prev, isPlaying: true }));
    source.onended = () => {
      setAudioState((prev) => ({
        ...prev,
        isPlaying: false,
        status: `playing-end:${prev.duration.toFixed(2)}`,
      }));
    };
  };

  const downloadWav = async () => {
    if (audioBufferRef.current) {
      try {
        const wavBlob = audioBufferToWav(audioBufferRef.current);
        const arrayBuffer = await wavBlob.arrayBuffer();

        // 使用 Tauri 的对话框 API 选择保存位置
        const filePath = await save({
          filters: [
            {
              name: "WAV Audio",
              extensions: ["wav"],
            },
          ],
          defaultPath: `recording-${formatTime(new Date())}.wav`,
          title: "保存音频文件",
        });

        if (filePath) {
          // 使用 Tauri 的文件系统 API 写入文件
          await writeFile(filePath, new Uint8Array(arrayBuffer));
        }
      } catch (err) {
        console.error("下载文件时出错:", err);
      }
    }
  };

  return { audioState, playAudio, downloadWav };
};
