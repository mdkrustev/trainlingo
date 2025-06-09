'use client';

import { FC } from 'react';

interface YouTubeThumbnailProps {
  youtubeVideoId: string | null;
  className?: string;
  onClick?: () => void;
}

const YouTubeThumbnail: FC<YouTubeThumbnailProps> = ({
  youtubeVideoId,
  className = '',
  onClick,
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`; 

  return (
    <div
      className={`youtube-thumbnail ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Preview of YouTube video ${youtubeVideoId}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img
        src={thumbnailUrl}
        alt={`Thumbnail for YouTube video ID: ${youtubeVideoId}`}
        loading="lazy"
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default YouTubeThumbnail;