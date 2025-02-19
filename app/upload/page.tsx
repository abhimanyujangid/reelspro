"use client";

import React, { useState } from "react";
import FileUpload from '../components/FileUpload';
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";

const UploadVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Upload successful:", response);
    setUploadedFileUrl(response.url);
    setProgress(100);
    setUploading(false);
  };

  const handleError = (error: Error) => {
    setError(error.message);
    setUploading(false);
  };

  const handleProgress = (progress: number) => {
    setProgress(progress);
  };

  const handlePublish = async () => {
    if (!uploadedFileUrl) {
      setError("Please upload a video first");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    // Here you would typically make an API call to save the video details
    try {
      const videoData = {
        title,
        description,
        videoUrl: uploadedFileUrl
      };
     // Add your API call here
     await apiClient.createVideo({ ...videoData, controls: true });
     toast.success("Video published successfully");

     // Reset form state
      setError(null);
      setTitle("");
      setDescription("");
      setUploadedFileUrl(null);
      
    } catch (err) {
      setError("Failed to publish video. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center text-white">
      <div className="w-full max-w-2xl p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Upload New Reel</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-800 text-white"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            className="textarea textarea-bordered w-full bg-gray-800 text-white"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Upload Video</label>
          <FileUpload
            fileType="video"
            onSuccess={handleSuccess}
            onError={handleError}
            onProgress={handleProgress}
          />
        </div>

        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-900/20 rounded">
            {error}
          </div>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {uploadedFileUrl && (
          <div className="mb-4 p-2 bg-green-900/20 rounded">
            Video uploaded successfully!
          </div>
        )}

        <button 
          className="btn btn-primary w-full mt-4" 
          onClick={handlePublish}
          disabled={uploading || !uploadedFileUrl}
        >
          {uploading ? "Uploading..." : "Publish Video"}
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;