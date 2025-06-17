// components/YouTubePlayer.tsx

import React from 'react';

interface YouTubePlayerProps {
  youtubeVideoId: string | null;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ youtubeVideoId }) => {

  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`} 
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        aria-label="YouTube video"
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;