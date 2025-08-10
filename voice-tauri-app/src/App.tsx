// App.tsx
import Controls from "./components/Controls";
import Output from "./components/Output";
import Status from "./components/Status";
import Visualizer from "./components/Visualizer";
import { useAudio } from "./hooks/useAudio";
import { useRecorder } from "./hooks/useRecorder";

export default function App() {
  const {
    recorderState,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
  } = useRecorder();
  const { audioState, playAudio, downloadWav } = useAudio(
    recorderState.audioBlob
  );

  return (
    <div className="hero min-h-screen bg-base-200 select-none">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold whitespace-nowrap">
            语音收集与转换
          </h1>
          <p className="py-6">点击“开始录音”按钮开始语音录制</p>
          <p>我们会将收集到的音频转换为 .wav 格式</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <Status status={recorderState.status} />
            <Visualizer
              analyser={recorderState.analyser}
              audioPlaying={audioState.isPlaying}
              duration={audioState.duration}
            />
            <Controls
              recorderState={recorderState}
              audioState={audioState}
              startRecording={startRecording}
              pauseRecording={pauseRecording}
              resumeRecording={resumeRecording}
              stopRecording={stopRecording}
              playAudio={playAudio}
              downloadAudio={downloadWav}
            />
            <Output downloadUrl={audioState.downloadUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}