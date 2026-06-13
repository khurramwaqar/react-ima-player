# react-ima-player

Modern React video player with Google IMA ads, quality selector, Picture-in-Picture, Chromecast, and subtitles. Built on [Video.js](https://videojs.com/), TypeScript-first, Next.js ready.

## Installation

```bash
npm install react-ima-player
```

## Quick Start

```tsx
import { ImaPlayer } from 'react-ima-player';

function App() {
  return (
    <ImaPlayer
      src="https://example.com/video.m3u8"
      poster="https://example.com/poster.jpg"
      adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?..."
      autoPlay
      enablePiP
      subtitles={[
        { lang: 'en', label: 'English', src: '/subs/en.vtt' },
        { lang: 'es', label: 'Spanish', src: '/subs/es.vtt' },
      ]}
      skin="netflix"
    />
  );
}
```

## API

### ImaPlayer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | required | Video source URL (HLS, DASH, MP4) |
| `poster` | `string` | — | Poster image URL |
| `adTagUrl` | `string` | — | Google IMA ad tag URL |
| `autoPlay` | `boolean` | `false` | Autoplay video |
| `muted` | `boolean` | `false` | Start muted |
| `loop` | `boolean` | `false` | Loop video |
| `width` | `number \| string` | `100%` | Player width |
| `height` | `number \| string` | `auto` | Player height |
| `enablePiP` | `boolean` | `false` | Show PiP button |
| `subtitles` | `SubtitleTrack[]` | — | Subtitle/caption tracks |
| `skin` | `'default' \| 'netflix'` | `'default'` | Player skin |
| `onReady` | `(player) => void` | — | Called when player is ready |
| `onAdStart` | `() => void` | — | Called when IMA ad starts |
| `onAdEnd` | `() => void` | — | Called when IMA ad ends |

### useVideoPlayer Hook

For custom implementations:

```tsx
import { useVideoPlayer } from 'react-ima-player';

function CustomPlayer() {
  const {
    playerRef, isPlaying, currentTime, duration,
    togglePlay, seek, setVolume, toggleMute, togglePiP, setSubtitles
  } = useVideoPlayer({ src: 'https://example.com/video.m3u8' });

  return (
    <div>
      <div ref={playerRef} />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input type="range" max={duration} value={currentTime} onChange={e => seek(+e.target.value)} />
    </div>
  );
}
```

## Next.js

All components use `'use client'`. Works out of the box with App Router.

```tsx
// app/layout.tsx
import { ImaPlayer } from 'react-ima-player';

export default function Page() {
  return (
    <ImaPlayer
      src="https://example.com/video.m3u8"
      adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?..."
    />
  );
}
```

## Features

- Google IMA video ads (preroll, midroll, postroll)
- HLS / DASH adaptive streaming
- Picture-in-Picture
- Chromecast support
- Multi-language subtitles
- Netflix-inspired skin
- Quality selector
- Keyboard shortcuts (space = play/pause)
- TypeScript types
- Zero runtime deps (Video.js is the only dep)
- SSR safe

## License

MIT
