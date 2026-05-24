import React, { useEffect, useState } from 'react';
import TileSprite from './TileSprite';

const GEMS = [55, 55, 55, 55, 55];

export default function Celebration({ onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 350);
  };

  return (
    <div className={`celebration-overlay${visible ? ' show' : ''}`} onClick={dismiss}>
      <div className="celebration-box" onClick={e => e.stopPropagation()}>
        <div className="celebration-gems">
          {GEMS.map((t, i) => <TileSprite key={i} tile={t} display={20} />)}
        </div>
        <div className="celebration-title">DUNGEON CLEARED!</div>
        <div className="celebration-subtitle">All monsters defeated today!</div>
        <div className="celebration-weapons">
          <TileSprite tile={118} display={36} />
          <TileSprite tile={72} display={36} />
          <TileSprite tile={118} display={36} />
        </div>
        <div className="celebration-tap" onClick={dismiss}>Tap to continue</div>
      </div>
    </div>
  );
}
