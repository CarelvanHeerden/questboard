import React, { useState, useEffect, useRef } from 'react';

// Renders an animated monster sprite from a horizontal frame strip.
// offsetY selects the animation row (e.g. oy=128 on a 64px sheet = row 2 = south-facing walk).
// display is the rendered pixel size; the sheet is scaled proportionally.
export default function MonsterSprite({ src, sheetW, sheetH, frameSize = 64, frames = 4, fps = 6, display = 48, filter, offsetY = 0 }) {
  const [frame, setFrame] = useState(0);
  const scale = display / frameSize;

  useEffect(() => {
    if (frames <= 1) return;
    const id = setInterval(() => setFrame(f => (f + 1) % frames), 1000 / fps);
    return () => clearInterval(id);
  }, [frames, fps]);

  return (
    <div style={{
      width: display,
      height: display,
      backgroundImage: `url('${src}')`,
      backgroundSize: `${sheetW * scale}px ${sheetH * scale}px`,
      backgroundPosition: `${-(frame * display)}px ${-(offsetY * scale)}px`,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      flexShrink: 0,
      filter,
    }} />
  );
}
