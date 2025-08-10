// components/Visualizer.tsx
import { useEffect, useRef } from "react";

type VisualizerProps = {
  analyser: AnalyserNode | null;
  audioPlaying: boolean;
  duration: number;
};

export default function Visualizer({
  analyser,
  audioPlaying,
  duration,
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playbackProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas || !analyser) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const drawWaveform = () => {
      analyser.getByteTimeDomainData(
        new Uint8Array(analyser.fftSize)
      );

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#F87272";
      canvasCtx.beginPath();

      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) canvasCtx.moveTo(x, y);
        else canvasCtx.lineTo(x, y);
        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
      animationFrameId = requestAnimationFrame(drawWaveform);
    };

    if (analyser) {
      drawWaveform();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser]);

  useEffect(() => {
    const progressEl = playbackProgressRef.current;
    if (!progressEl) return;
    if (audioPlaying) {
      progressEl.style.transitionDuration = `${duration}s`;
      progressEl.style.width = "100%";
    } else {
      progressEl.style.transitionDuration = "0s";
      progressEl.style.width = "0";
    }
  }, [audioPlaying, duration]);

  return (
    <div className="w-full h-20 bg-base-300 rounded-box flex items-center justify-center mb-4 relative overflow-hidden">
      {analyser ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-box"
          style={{ display: "block" }}
        />
      ) : (
        <span className="text-xs text-base-content/50">
          波形图将在此处显示
        </span>
      )}
      <div
        ref={playbackProgressRef}
        className="absolute h-full left-0 top-0 bg-primary/20 rounded-box"
      ></div>
    </div>
  );
}