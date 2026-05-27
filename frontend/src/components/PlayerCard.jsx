import React, { useState, useEffect, useRef, useCallback } from 'react';
import { todayKey, dateSeededMonster, resolveMonster, getLevelFromXP, critChanceForLevel, luckForLevel, getPlayerTitle } from '../logic';
import { BADGES } from '../data';
import TileSprite from './TileSprite';
import MonsterSprite from './MonsterSprite';
import { MONSTER_SPRITES } from '../monsterSprites';

function HpSegBar({ hp, maxHP, low }) {
  const segments = Math.min(maxHP, 20);
  const filledSegs = maxHP > 0 ? Math.round((hp / maxHP) * segments) : 0;
  return (
    <div className="hp-bar-segmented">
      {Array.from({ length: segments }, (_, i) => (
        <div key={i} className={`hp-seg${i < filledSegs ? (low ? ' filled low' : ' filled') : ''}`} />
      ))}
    </div>
  );
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const CLASS_TILES = {
  warrior: { tile: 87, label: 'Warrior'  },
  mage:    { tile: 84, label: 'Mage'     },
  witch:   { tile: 99, label: 'Witch'    },
  rogue:   { tile: 96, label: 'Rogue'    },
  paladin: { tile: 88, label: 'Paladin'  },
  ranger:  { tile: 82, label: 'Ranger'   },
};


export default function PlayerCard({ player, gold, xp, isSelected, onClick, monsterDamage, monsterBaseline, lastHit, streak, monster, prestige, badges, onPrestige }) {
  const tKey = todayKey();
  const m = resolveMonster(monster, player) || dateSeededMonster(player, tKey);
  const totalDmg = (monsterDamage?.[player.id]?.[tKey]) || 0;
  const baseline = (monsterBaseline?.[player.id]?.[tKey]) || 0;
  const dmg = totalDmg - baseline;
  const hp = Math.max(0, Math.min(m.maxHP, m.maxHP - dmg));
  const dead = hp === 0;
  const pct = Math.round((hp / m.maxHP) * 100);
  const low = pct < 30;

  const charCfg = CLASS_TILES[player.class] ?? CLASS_TILES.warrior;
  const mc = MONSTER_SPRITES[m.id] ?? MONSTER_SPRITES.green_slime;
  const { level, xpInLevel, xpNeeded } = getLevelFromXP(xp || 0);
  const critPct = Math.round(critChanceForLevel(level) * 100);
  const luckPct = Math.round(luckForLevel(level) * 100);
  const title = getPlayerTitle(badges || []);
  const prestigeCount = prestige || 0;
  const earnedBadges = (badges || []).map(id => BADGES.find(b => b.id === id)).filter(Boolean);

  // Coin flip on gold gain
  const prevGoldRef = useRef(gold);
  const [coinFlipping, setCoinFlipping] = useState(false);
  useEffect(() => {
    if (gold > prevGoldRef.current) {
      setCoinFlipping(true);
      setTimeout(() => setCoinFlipping(false), 500);
    }
    prevGoldRef.current = gold;
  }, [gold]);

  // Hit flash state: triggered by lastHit changing
  const [hitting, setHitting] = useState(false);
  const [dmgNum, setDmgNum] = useState(null);
  const [isCritHit, setIsCritHit] = useState(false);
  const prevHit = useRef(lastHit);

  useEffect(() => {
    if (lastHit && lastHit !== prevHit.current) {
      prevHit.current = lastHit;
      setHitting(true);
      setDmgNum(lastHit.pts);
      setIsCritHit(!!lastHit.crit);
      setTimeout(() => setHitting(false), 350);
      setTimeout(() => { setDmgNum(null); setIsCritHit(false); }, 900);
    }
  }, [lastHit]);

  return (
    <div className={`player-card ${isSelected ? 'active' : ''}`} onClick={onClick} style={{ backgroundColor: hexToRgba(player.textColor, 0.07) }}>
      <div className={`char-sprite${isSelected ? ' char-active' : ''}`}>
        <TileSprite tile={charCfg.tile} scale={4} />
      </div>
      <div className="player-info">
        <div className="player-name">
          {player.name}
          {prestigeCount > 0 && <span className="prestige-stars">{'⭐'.repeat(prestigeCount)}</span>}
        </div>
        {title && <div className="player-title">{title}</div>}
        <div className="player-class">{charCfg.label}</div>
        <div className="player-pts">
          <span className={`gold-coin${coinFlipping ? ' flipping' : ''}`} />
          <span className="pixel-num">{gold}</span>
          <span className="player-pts-label">gold</span>
        </div>
        <div className="player-level">
          <span className="level-badge">Lv {level}</span>
          <span className="crit-chance">{critPct}% crit</span>
          <span className="luck-chance">{Math.round(luckForLevel(level) * 100)}% luck</span>
        </div>
        <div className="xp-bar-outer" title={`${xpInLevel}/${xpNeeded} XP`}>
          <div className="xp-bar-fill" style={{ width: `${Math.round((xpInLevel / xpNeeded) * 100)}%`, background: `linear-gradient(90deg, ${player.color}, ${player.textColor})` }} />
        </div>
        {streak > 0 && (
          <div className="player-streak">
            <TileSprite tile={131} display={11} />
            {streak}d streak
          </div>
        )}
        {earnedBadges.length > 0 && (
          <div className="badge-row">
            {earnedBadges.slice(-5).map(b => (
              <span key={b.id} className="badge-icon" title={`${b.name}: ${b.desc}`}>{b.icon}</span>
            ))}
          </div>
        )}
        {level >= 10 && onPrestige && (
          <button
            className="prestige-btn"
            onClick={e => { e.stopPropagation(); onPrestige(player.id); }}
            title="Prestige: reset XP for permanent gold bonus"
          >⭐ PRESTIGE</button>
        )}
      </div>
      <div className={`monster-section${dead ? ' monster-dead' : ''}`}>
        <div className={`monster-name${dead ? ' defeated' : ''}`}>
          <TileSprite tile={dead ? 123 : 118} display={10} />
          {m.name}
        </div>
        <div className="monster-sprite-wrap" style={{ position: 'relative' }}>
          {dead ? (
            <div className="bones-display"><TileSprite tile={123} display={36} /></div>
          ) : (
            <>
              <div className={hitting ? 'monster-hit' : ''}>
                {mc.type === 'img' ? (
                  <img
                    src={mc.src}
                    className="monster-idle"
                    style={{ height: mc.dp ?? 72, width: 'auto', maxWidth: 130, imageRendering: 'pixelated', display: 'block', margin: '0 auto' }}
                  />
                ) : (
                  <MonsterSprite
                    src={mc.src}
                    sheetW={mc.sw}
                    sheetH={mc.sh}
                    frameSize={mc.fs ?? 64}
                    frames={mc.fr ?? 4}
                    fps={6}
                    display={mc.dp ?? 48}
                    filter={mc.f}
                    offsetY={mc.oy ?? 0}
                  />
                )}
              </div>
              {dmgNum !== null && (
                <div className={`dmg-number${isCritHit ? ' crit' : ''}`}>
                  {isCritHit ? '⚡' : ''}-{dmgNum}
                </div>
              )}
              {hitting && <div className="hit-flash" />}
            </>
          )}
        </div>
        <div className="hp-text"><span className="pixel-num">{dead ? `+${m.gold} gold!` : `HP ${hp}/${m.maxHP}`}</span></div>
        {dead
          ? <div className="hp-bar-outer"><div className="hp-bar-fill" style={{ width: '0%' }} /></div>
          : <HpSegBar hp={hp} maxHP={m.maxHP} low={low} />
        }
      </div>
    </div>
  );
}
