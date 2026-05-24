import React from 'react';

// tile can be a number (tilemap index) or a string (custom icon filename in /sprites/icons/)
// scale=4 → 64px, scale=2 → 32px, scale=1 → 16px
// display overrides the rendered size while keeping pixel-perfect scaling
export default function TileSprite({ tile, scale = 4, display, filter }) {
  const baseSize = 16 * scale;
  const size = display ?? baseSize;

  if (typeof tile === 'string') {
    // Code points above 255 are emoji; ASCII strings are legacy custom-icon filenames.
    if (tile.codePointAt(0) > 255) {
      return (
        <span style={{
          fontSize: size * 0.85,
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          flexShrink: 0,
        }}>
          {tile}
        </span>
      );
    }
    return (
      <img
        src={`/sprites/icons/${tile}.png`}
        width={size}
        height={size}
        style={{ imageRendering: 'pixelated', flexShrink: 0, filter, display: 'block' }}
        alt=""
      />
    );
  }

  const col = tile % 12;
  const row = Math.floor(tile / 12);
  const ratio = size / 16;
  return (
    <div style={{
      width: size,
      height: size,
      backgroundImage: "url('/sprites/tilemap_packed.png')",
      backgroundSize: `${192 * ratio}px ${176 * ratio}px`,
      backgroundPosition: `${-(col * size)}px ${-(row * size)}px`,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      flexShrink: 0,
      filter,
    }} />
  );
}
