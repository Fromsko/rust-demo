import {
    FaDownload,
    FaMicrophone,
    FaPause,
    FaPlay,
} from "react-icons/fa";
import { MdPlayArrow as MdPlayArrowIcon } from "react-icons/md";
import { AudioState, RecorderState } from "../types";

type ControlsProps = {
  recorderState: RecorderState;
  audioState: AudioState;
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  playAudio: () => void;
  downloadAudio: () => void;
};

export default function Controls({
  recorderState,
  audioState,
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  playAudio,
  downloadAudio,
}: ControlsProps) {
  const isRecording = recorderState.status === "recording";
  const isPaused = recorderState.status === "paused";
  const hasAudio = !!recorderState.audioBlob;

  const getRecordBtnText = () => (isRecording || isPaused ? "停止录音" : "开始录音");

  const handleRecordClick = () => (isRecording || isPaused ? stopRecording() : startRecording());

  const handlePauseClick = () => (isPaused ? resumeRecording() : pauseRecording());

  return (
    <div className="card-actions justify-between mt-4">
      <button
        onClick={handleRecordClick}
        className="btn btn-success btn-sm hover:scale-105"
        disabled={audioState.isPlaying}
      >
        <FaMicrophone className="mr-2 h-4 w-4" />
        <span>{getRecordBtnText()}</span>
      </button>

      <button
        onClick={handlePauseClick}
        className="btn btn-warning btn-sm hover:scale-105"
        disabled={!isRecording && !isPaused}
      >
        {isPaused ? <FaPlay className="mr-2 h-4 w-4" /> : <FaPause className="mr-2 h-4 w-4" />}
        {isPaused ? "继续" : "暂停"}
      </button>

      <button
        onClick={playAudio}
        className="btn btn-info btn-sm hover:scale-105"
        disabled={!hasAudio || audioState.isPlaying || isRecording || isPaused}
      >
        <MdPlayArrowIcon className="mr-2 h-4 w-4" />
        播放
      </button>

      <button
        onClick={downloadAudio}
        className="btn btn-primary btn-sm hover:scale-105"
        disabled={!hasAudio || audioState.isPlaying}
      >
        <FaDownload className="mr-2 h-4 w-4" />
        下载
      </button>
    </div>
  );
}