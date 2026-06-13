import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom', 'video.js'],
  banner: {
    js: "'use client';",
  },
  plugins: [
    {
      name: 'copy-css',
      buildEnd() {
        const src = resolve('node_modules/video.js/dist/video-js.css');
        const dest = resolve('dist/video-js.css');
        copyFileSync(src, dest);
      },
    },
  ],
});
