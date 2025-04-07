import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";

export default function Hero() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Dropped files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-4">Master Your Music with AI</h1>
      <p className="text-gray-600 mb-6">
        Drag & drop your track below to get started.
      </p>
      <Card className="p-6 w-96 flex flex-col items-center border-dashed border-2 border-gray-300">
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag & drop your file here, or click to browse</p>
        </div>
      </Card>
    </section>
  );
}
