import React from 'react';
import { IVideo } from '@/models/Video';
import { apiClient } from '@/lib/api-client';
import { useEffect } from 'react';
import { IKVideo } from 'imagekitio-next';

// Enhanced interface with ImageKit specific properties

const Video = () => {
  const [videos, setVideos] = React.useState<IVideo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
console.log(videos)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await apiClient.getVideos();
        setVideos(fetchedVideos);
      } catch (err) {
        setError('Failed to load videos');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <div 
          key ={video._id} 
          className="bg-gray-900 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="aspect-video relative">
          <IKVideo
              src={video?.videoUrl}
              controls={video.controls}
              transformation={[
                { width: video.transformation?.width?.toString(), height: video.transformation?.height?.toString(), quality: video.transformation?.quality?.toString() },
              ]}
            />
          </div>
          
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
              {video.title}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-2">
              {video.description}
            </p>
            {video.createdAt && (
              <p className="text-gray-500 text-xs mt-2">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Video;