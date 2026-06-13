'use client';

import { useVideoPlayer } from '../hooks/useVideoPlayer';
import type { ImaPlayerProps } from '../types';

export function ImaPlayer(props: ImaPlayerProps) {
  const {
    src,
    poster,
    adTagUrl,
    autoPlay,
    muted,
    loop,
    qualities,
    enablePiP,
    subtitles,
    skin = 'default',
    controls = true,
    width,
    height,
    onReady,
    onPlay,
    onPause,
    onEnded,
    onAdStart,
    onAdEnd,
    onError,
  } = props;

  const player = useVideoPlayer({
    src,
    poster,
    adTagUrl,
    autoPlay,
    muted,
    loop,
    qualities,
    subtitles,
    onReady,
  });

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    maxWidth: '100%',
    backgroundColor: '#000',
    ...(skin === 'netflix' ? { borderRadius: 4, overflow: 'hidden' } : {}),
  };

  return (
    <div style={containerStyle} className={`ima-player ima-player--${skin}`}>
      <div data-vjs-player>
        <video ref={player.playerRef as React.Ref<HTMLVideoElement>} className="video-js vjs-big-play-centered" playsInline />
      </div>

      {enablePiP && (
        <button
          onClick={player.togglePiP}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 12,
            zIndex: 10,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: 12,
          }}
          title="Picture-in-Picture"
        >
          ⛶ PiP
        </button>
      )}

      {subtitles && subtitles.length > 0 && (
        <div style={{ position: 'absolute', bottom: 60, right: 60, zIndex: 10 }}>
          <select
            onChange={(e) => player.setSubtitles(e.target.value || null)}
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            <option value="">Subtitles: Off</option>
            {subtitles.map((sub) => (
              <option key={sub.lang} value={sub.lang}>
                {sub.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
