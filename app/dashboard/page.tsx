"use client";

import { apiClient } from '@/lib/api-client';
import { IVideo } from '@/models/Video';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UploadVideo from '../upload/page';
import Video from '../video/page';

export default function Dashboard() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
     <Navbar />
     <Video />
    </div>
  );
}
