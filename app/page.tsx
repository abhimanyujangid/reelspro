import { apiClient } from '@/lib/api-client';
import { IVideo } from '@/models/Video';
import React, { useEffect } from 'react';
import { useState } from 'react';


export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchVideos();
  }, []);

  return (
    <div>
     <h1>Home</h1>
    </div>
  );
}
