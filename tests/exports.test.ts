import { describe, it, expect } from 'vitest';
import { ImaPlayer, useVideoPlayer } from '../src/index';

describe('react-ima-player exports', () => {
  it('exports ImaPlayer', () => {
    expect(ImaPlayer).toBeDefined();
  });

  it('exports useVideoPlayer', () => {
    expect(useVideoPlayer).toBeDefined();
  });
});
