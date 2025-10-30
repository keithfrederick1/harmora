import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Card } from "@/components/ui/card";

export default function Hero() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const reasons = fileRejections[0].errors.map(e => e.message).join(", ");
        setError(`Invalid file: ${reasons}`);
        setAudioFile(null);
        setAudioURL(undefined);
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setAudioFile(file);
        setAudioURL(URL.createObjectURL(file));
        setError(null);
      }
    },
    []
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "audio/mpeg": [".mp3"], "audio/wav": [".wav"] },
    multiple: false,
    noClick: true, // programmatic open
  });

  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-4">Master Your Music with AI</h1>
      <p className="text-gray-600 mb-6">
        Drag & drop your track below to get started.
      </p>

      <Card className="p-6 w-96 flex flex-col items-center border-dashed border-2 border-gray-300">
        {/* Always keep input mounted for open() to work */}
        <input {...getInputProps()} />

        {!audioFile ? (
          <div
            {...getRootProps()}
            className="cursor-pointer w-full"
            onClick={open}
          >
            <p className="text-gray-500">
              Drag & drop your file here, or click to browse (MP3/WAV only)
            </p>
            {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <p className="text-gray-700 mb-2">File ready: {audioFile.name}</p>
            {audioURL && <audio controls src={audioURL} className="w-full mb-4" />}
            {error && <p className="text-red-500 mt-2 font-medium">{error}</p>}
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => alert("Mastering service not implemented yet")}
              >
                Master
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={open} // now works even after file upload
              >
                Replace File
              </button>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}
