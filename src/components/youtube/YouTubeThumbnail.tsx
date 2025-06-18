// components/youtube/YouTubeThumbnail.tsx

import Image from 'next/image';

interface YouTubeThumbnailProps {
  youtubeVideoId: string | null;
  onClick?: () => void;
  className?: string;
}

export default function YouTubeThumbnail({ youtubeVideoId, onClick, className }: YouTubeThumbnailProps) {
  if (!youtubeVideoId) return null;

  // Използваме проксито ни вместо директния линк към i.ytimg.com
  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`; 

  const proxyUrl = `/api/image?url=${encodeURIComponent(thumbnailUrl)}`;

  return (
    <div className="relative w-full pt-[56.25%] cursor-pointer overflow-hidden" onClick={onClick}>
      <Image
        src={proxyUrl}
        alt={`YouTube video ${youtubeVideoId}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover hover:scale-105 duration-300 ${className || ''}`}
        priority
        onError={(e) => {
          // Ако maxresdefault не съществува, опитай hqdefault
          const fallbackUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`; 
          (e.target as HTMLImageElement).src = `/api/image?url=${encodeURIComponent(fallbackUrl)}`;
        }}
      />
    </div>
  );
}