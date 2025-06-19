import React, { useState, useEffect, useRef } from 'react';

interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

type SubtitlesState =
  | { status: 'loading' }
  | { status: 'success'; data: SubtitleCue[] }
  | { status: 'error'; error: string };

interface YouTubePlayerProps {
  youtubeVideoId: string | null;
}

interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ youtubeVideoId }) => {
  const [player, setPlayer] = useState<YouTubePlayerInstance | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [subtitlesState, setSubtitlesState] = useState<SubtitlesState>({
    status: 'loading',
  });
  const [highlightedWord, setHighlightedWord] = useState<string | null>(null);

  const playerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!youtubeVideoId) return;

    const fetchSubtitles = async () => {
      setSubtitlesState({ status: 'loading' });
      try {
        const res = await fetch(
          `https://www.youtube.com/api/timedtext?video_id=${youtubeVideoId}&format=json3`
        );
        if (!res.ok) throw new Error('No subtitles found');

        const data: {
          events?: {
            tStartMs: number;
            dDurationMs: number;
            segs?: { utf8: string }[];
          }[];
        } = await res.json();

        const cues: SubtitleCue[] = [];

        if (data.events) {
          data.events.forEach((event) => {
            const { tStartMs, dDurationMs, segs } = event;
            if (tStartMs !== undefined && dDurationMs !== undefined) {
              const start = tStartMs / 1000;
              const end = start + dDurationMs / 1000;
              const text = segs?.map((s) => s.utf8).join('') ?? '';
              if (text.trim()) cues.push({ start, end, text });
            }
          });
        }
        setSubtitlesState({ status: 'success', data: cues });
      } catch (err) {
        console.error(err);
        setSubtitlesState({
          status: 'error',
          error: 'Failed to load subtitles',
        });
      }
    };

    fetchSubtitles();
  }, [youtubeVideoId]);

  const createPlayer = () => {
    if (!playerRef.current || !youtubeVideoId) return;

    const newPlayer: any = new window.YT.Player(playerRef.current, {
      videoId: youtubeVideoId,
      playerVars: {
        enablejsapi: 1,
        autoplay: 0,
      },
      events: {
        onStateChange: (event:any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
              if (newPlayer && typeof newPlayer.getCurrentTime === 'function') {
                setCurrentTime(newPlayer.getCurrentTime());
              }
            }, 500);
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        },
      },
    });

    // Задължително cast-ваме към YouTubePlayerInstance
    const typedPlayer: YouTubePlayerInstance = {
      playVideo: () => newPlayer.playVideo(),
      pauseVideo: () => newPlayer.pauseVideo(),
      getCurrentTime: () => newPlayer.getCurrentTime(),
      destroy: () => newPlayer.destroy(),
    };

    setPlayer(typedPlayer);
  };

  useEffect(() => {
    if (!youtubeVideoId) return;

    if (player) {
      player.destroy();
      setPlayer(null);
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    return () => {
      if (player) {
        player.destroy();
        setPlayer(null);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [youtubeVideoId]);

  const handleWordClick = (word: string) => {
    setHighlightedWord(word);
    player?.pauseVideo();
  };

  const currentSubtitles =
    subtitlesState.status === 'success'
      ? subtitlesState.data.filter(
          (cue) => currentTime >= cue.start && currentTime <= cue.end
        )
      : [];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full aspect-video mb-4">
        <div
          ref={playerRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
        />
      </div>

      <div className="mt-2 w-full text-center">
        {subtitlesState.status === 'loading' && (
          <p className="text-gray-500">Зареждане на субтитри...</p>
        )}

        {subtitlesState.status === 'error' && (
          <p className="text-red-500">{subtitlesState.error}</p>
        )}

        {currentSubtitles.length > 0 ? (
          currentSubtitles.map((cue, index) => (
            <p key={index} className="text-base md:text-lg mb-2">
              {cue.text.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={`mx-1 cursor-pointer transition-colors ${
                    word === highlightedWord
                      ? 'bg-yellow-300 font-semibold'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </span>
              ))}
            </p>
          ))
        ) : (
          <p className="text-gray-500">Няма налични субтитри</p>
        )}
      </div>
    </div>
  );
};

export default YouTubePlayer;