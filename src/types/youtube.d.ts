export {};

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement | null, options: any) => {
        playVideo: () => void;
        pauseVideo: () => void;
        getCurrentTime: () => number;
        // добави още, ако ти трябват
      };
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        // други състояния ако искаш
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
