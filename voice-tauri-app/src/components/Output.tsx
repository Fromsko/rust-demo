// components/Output.tsx

type OutputProps = {
  downloadUrl: string | null;
};

export default function Output({ downloadUrl }: OutputProps) {
  return (
    <>
      <div className="divider mt-6">输出结果</div>
      <div className="mockup-code mt-4">
        <pre data-prefix=">">
          <code className="text-xs">
            {downloadUrl ? (
              <a
                href={downloadUrl}
                download={`recording-${new Date()
                  .toISOString()
                  .slice(0, 19)
                  .replace(/[-T:]/g, "")}.wav`}
                className="text-primary hover:underline"
              >
                转换完成！点击下载录音 (WAV)
              </a>
            ) : (
              "此处将显示转换后的音频链接"
            )}
          </code>
        </pre>
      </div>
    </>
  );
}