"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onError: (err: Error) => void;
  fileType?: "image" | "video";
  onProgress?: (progress: number) => void;
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
  onError,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
    onError(new Error(err.message));
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const progress = Math.round((evt.loaded / evt.total) * 100);
      onProgress(progress);
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Invalid file type, please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size should not exceed 100MB");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type, please upload an image file");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <IKUpload
        fileName={fileType === "video" ? "sample-video" : "sample-image"}
        className="file-input file-input-bordered w-full"
        useUniqueFileName={true}
        accept={fileType === "video" ? "video/*" : "image/*"}
        onError={handleError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileType === "video" ? "/video" : "/image"}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && validateFile(file)) {
            setError(null);
          } else {
            event.target.value = ""; // Reset file input if invalid
          }
        }}
      />
      {uploading && (
        <div className="flex items-center gap-2 mt-4">
          <Loader2 size={20} className="animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
