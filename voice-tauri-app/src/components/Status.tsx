// components/Status.tsx

type StatusProps = {
  status: string;
};

export default function Status({ status }: StatusProps) {
  const showLoading = status === "recording" || status === "processing";

  return (
    <div className="flex items-center mb-4">
      <label className="label">
        <span className="label-text">状态:</span>
      </label>
      <span className="ml-2 text-sm">
        {status === "recording" && "🎶 录音中..."}
        {status === "paused" && "⏸️ 录制已暂停。"}
        {status === "processing" && "🪄 处理音频中..."}
        {status === "playing" && "🎧️ 播放中..."}
        {status === "idle" && "就绪"}
        {status === "error" && "🚫 无法访问麦克风"}
        {status.startsWith("ready") && `💯 就绪：${status.split(":")[1]} 秒音频`}
        {status.startsWith("playing-end") &&
          `✅️ 播放完成：${status.split(":")[1]} 秒音频`}
      </span>
      {showLoading && (
        <span className="loading loading-dots loading-sm ml-2"></span>
      )}
    </div>
  );
}