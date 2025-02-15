"use client";

import { apiClient } from '@/lib/api-client';
import { IVideo } from '@/models/Video';
import React  from 'react';
import { useEffect, useState } from 'react';



export default function Home() {
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
    <div>
      <h1>Home</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
}

