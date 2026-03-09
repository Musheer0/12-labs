"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IconUpload, IconMusic, IconTrash } from "@tabler/icons-react";

export default function AudioDropzone({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    setFile(selected);
    onUpload(selected);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "audio/*": [],
    },
    maxSize: 20 * 1024 * 1024,
  });

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full max-w-md">
      {/* DROPZONE */}
      {!file && (
        <Card
          {...getRootProps()}
          className="p-4 border-dashed cursor-pointer flex flex-col gap-1 items-center text-center hover:bg-muted/50 transition"
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <>
              <IconUpload size={40} className="mb-1 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drop audio here</p>
            </>
          ) : (
            <>
              <IconMusic size={30} className="mb-1 p-0 text-muted-foreground" />

              <p className="font-medium leading-none">Upload audio</p>

              <p className="text-xs text-muted-foreground leading-none">
                Drag & drop or click
              </p>
            </>
          )}
        </Card>
      )}

      {/* FILE PREVIEW */}
      {file && (
        <Card className="p-4 flex items-center justify-between w-full gap-4">
          <div className="flex  items-center w-full justify-between gap-3">
            <IconMusic size={28} />

            <div className="text-sm mr-auto">
              <p className="font-medium">{file.name}</p>

              <p className="text-muted-foreground text-xs">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button size="icon" variant="destructive" onClick={removeFile}>
              <IconTrash size={18} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
