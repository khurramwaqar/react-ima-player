'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import videojs from 'video.js';
import type { UseVideoPlayerOptions, UseVideoPlayerResult, SubtitleTrack, QualityOption } from '../types';

let playerCounter = 0;

export function useVideoPlayer(options: UseVideoPlayerOptions): UseVideoPlayerResult {
  const {
    src,
    poster,
    adTagUrl,
    autoPlay,
    muted,
    loop,
    qualities,
    subtitles,
    onReady,
  } = options;

  const playerRef = useRef<HTMLVideoElement | null>(null);
  const playerInstance = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!!muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [showPiP, setShowPiP] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);
  const playerId = useRef(`vjs-player-${++playerCounter}`).current;

  useEffect(() => {
    const element = playerRef.current;
    if (!element) return;
    const player = videojs.getPlayer(element) || videojs(element, {
      controls: true,
      autoplay: autoPlay ?? false,
      muted: muted ?? false,
      loop: loop ?? false,
      poster: poster ?? '',
      fluid: true,
      aspectRatio: '16:9',
      html5: {},
      plugins: {},
    });

    playerInstance.current = player;

    if (subtitles) {
      addSubtitles(player, subtitles);
    }

    player.ready(() => {
      player.src({ src, type: getMimeType(src) });
      setIsReady(true);
      onReady?.(player);
    });

    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));
    player.on('ended', () => setIsPlaying(false));
    player.on('timeupdate', () => setCurrentTime(player.currentTime() ?? 0));
    player.on('loadedmetadata', () => setDuration(player.duration() ?? 0));
    player.on('volumechange', () => {
      setIsMuted(player.muted() ?? false);
      setVolumeState(player.volume() ?? 1);
    });

    player.on('error', () => {
      console.error('Video.js error:', player.error());
    });

    return () => {
      const p = playerInstance.current;
      if (p) {
        p.pause();
        p.off();
        playerInstance.current = null;
      }
    };
  }, []);

  const play = useCallback(() => { playerInstance.current?.play(); }, []);
  const pause = useCallback(() => { playerInstance.current?.pause(); }, []);
  const togglePlay = useCallback(() => {
    if (playerInstance.current?.paused()) {
      playerInstance.current.play();
    } else {
      playerInstance.current?.pause();
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (playerInstance.current) {
      playerInstance.current.currentTime(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (playerInstance.current) {
      playerInstance.current.volume(Math.max(0, Math.min(1, vol)));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (playerInstance.current) {
      playerInstance.current.muted(!playerInstance.current.muted());
    }
  }, []);

  const setQuality = useCallback((_quality: string) => {
    if (!playerInstance.current) return;
    const levels = (playerInstance.current as any).qualityLevels?.();
    if (!levels) return;
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      const label = `${level.height}p`;
      level.enabled = label === _quality || _quality === 'auto';
    }
  }, []);

  const togglePiP = useCallback(async () => {
    const videoEl = playerInstance.current?.el()?.querySelector('video');
    if (!videoEl) return;
    try {
      if (document.pictureInPictureElement === videoEl) {
        await document.exitPictureInPicture();
        setShowPiP(false);
      } else {
        await videoEl.requestPictureInPicture();
        setShowPiP(true);
      }
    } catch {
      // PiP not supported
    }
  }, []);

  const handleSubtitleChange = useCallback((lang: string | null) => {
    if (!playerInstance.current) return;
    const tracks = playerInstance.current.textTracks();
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.mode = track.language === lang ? 'showing' : 'hidden';
    }
    setActiveSubtitle(lang);
  }, []);

  return {
    playerRef,
    player: playerInstance.current,
    isReady,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    volume,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    setQuality,
    togglePiP,
    showPiP,
    setSubtitles: handleSubtitleChange,
    activeSubtitle,
  };
}

function getMimeType(src: string): string {
  if (src.endsWith('.m3u8')) return 'application/x-mpegURL';
  if (src.endsWith('.mpd')) return 'application/dash+xml';
  if (src.endsWith('.mp4')) return 'video/mp4';
  if (src.endsWith('.webm')) return 'video/webm';
  if (src.endsWith('.ogg')) return 'video/ogg';
  if (src.includes('.m3u8') || src.includes('m3u8')) return 'application/x-mpegURL';
  return 'video/mp4';
}

function addSubtitles(player: any, subtitles: SubtitleTrack[]) {
  for (const sub of subtitles) {
    const track = player.addRemoteTextTrack({
      kind: 'captions',
      language: sub.lang,
      label: sub.label,
      src: sub.src,
      default: sub.default ?? false,
    }, false);
    if (sub.default) {
      track.mode = 'showing';
    }
  }
}
