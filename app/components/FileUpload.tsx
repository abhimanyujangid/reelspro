"use client";
import React, { useState, ChangeEvent } from "react";
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
    console.error("Upload Error:", err); // Better error logging
    setError(err.message);
    setUploading(false);
    onError(new Error(err.message));
  };

  const handleSuccess = (res: IKUploadResponse) => {
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

  const validateFile = (file: File | undefined): boolean => {
    if (!file) {
      setError("Please select a file");
      return false;
    }
    

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
        setError("Invalid file type, please upload an image file (JPEG, PNG)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return false;
      }
    }
    return true;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Please select a file");
      event.target.value = "";
      return;
    }

    if (validateFile(file)) {
      setError(null);
    } else {
      event.target.value = ""; // reset the input
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className={`w-full ${error ? 'border-error' : ''}`}>
        <IKUpload
          fileName={fileType === "video" ? "sample-video" : "sample-image"}
          className="file-input file-input-bordered w-full"
          useUniqueFileName={true}
          accept={fileType === "video" ? "video/*" : "image/jpeg,image/png,image/jpg"}
          onError={handleError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
          folder={fileType === "video" ? "/video" : "/image"}
          onChange={handleChange}
        />
      </div>
      {uploading && (
        <div className="flex items-center gap-2 mt-4">
          <Loader2 size={20} className="animate-spin" />
          <span>Uploading{fileType === "video" ? " video" : " image"}...</span>
        </div>
      )}
      {error && (
        <div className="text-error text-sm mt-2 w-full">
          {error}
        </div>
      )}
    </div>
  );
}