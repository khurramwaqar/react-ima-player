import type { ReactNode } from 'react';

export interface SubtitleTrack {
  lang: string;
  label: string;
  src: string;
  default?: boolean;
}

export interface QualityOption {
  label: string;
  value: string;
  bitrate?: number;
}

export interface ImaPlayerProps {
  src: string;
  poster?: string;
  adTagUrl?: string;
  adTagUrlVpaid?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  width?: number | string;
  height?: number | string;
  qualities?: (string | QualityOption)[];
  enablePiP?: boolean;
  enableChromecast?: boolean;
  subtitles?: SubtitleTrack[];
  skin?: 'default' | 'netflix';
  controls?: boolean;
  onReady?: (player: any) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onAdStart?: () => void;
  onAdEnd?: () => void;
  onError?: (error: any) => void;
  children?: ReactNode;
}

export interface UseVideoPlayerOptions {
  src: string;
  poster?: string;
  adTagUrl?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  qualities?: (string | QualityOption)[];
  subtitles?: SubtitleTrack[];
  onReady?: (player: any) => void;
}

export interface UseVideoPlayerResult {
  playerRef: React.RefObject<HTMLDivElement | null>;
  player: any;
  isReady: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setQuality: (quality: string) => void;
  togglePiP: () => void;
  showPiP: boolean;
  setSubtitles: (lang: string | null) => void;
  activeSubtitle: string | null;
}
