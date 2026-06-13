import { ImaPlayer } from 'react-ima-player';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 960, margin: '0 auto' }}>
      <h1>react-ima-player Demo</h1>

      <ImaPlayer
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        poster="https://dummyimage.com/1280x720/333/fff&text=Video+Poster"
        adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
        autoPlay
        muted
        enablePiP
        subtitles={[
          { lang: 'en', label: 'English', src: 'https://raw.githubusercontent.com/videojs/video.js/main/docs/examples/samples/subtitles-en.vtt', default: true },
          { lang: 'es', label: 'Spanish', src: 'https://raw.githubusercontent.com/videojs/video.js/main/docs/examples/samples/subtitles-es.vtt' },
        ]}
        skin="netflix"
        onReady={(player) => console.log('Player ready', player)}
        onAdStart={() => console.log('Ad started')}
        onAdEnd={() => console.log('Ad ended')}
      />
    </div>
  );
}

export default App;
