// ./src/components/youtube/YouTubeThumbnail.tsx

import Image from 'next/image';

interface YouTubeThumbnailProps {
    youtubeVideoId: string | null;
    onClick?: () => void;
    className?: string;
}

export default function YouTubeThumbnail({ youtubeVideoId, onClick, className }: YouTubeThumbnailProps) {
    if (!youtubeVideoId) return null;

    const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`; 

    return (
        <div className="relative w-full pt-[56.25%] cursor-pointer" onClick={onClick}>
            <Image
                src={thumbnailUrl}
                alt={`YouTube video ${youtubeVideoId}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover rounded ${className || ''}`}
            />
        </div>
    );
}