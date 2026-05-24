import React from 'react';
import { PLAYERS } from '../data';
import { getRewardsFor } from '../logic';
import TileSprite from './TileSprite';

export default function RewardGrid({ selectedPlayerId, gold, onRedeemReward }) {
  const player = PLAYERS.find(p => p.id === selectedPlayerId);
  const rewards = getRewardsFor(selectedPlayerId);

  return (
    <>
      <div className="section-label">
        {player.name} — <span className="gold-coin" /> {gold} gold — tap to redeem
      </div>
      <div className="rewards">
        {rewards.map(r => (
          <div
            key={r.id}
            className={`reward${gold < r.cost ? ' cant-afford' : ''}`}
            onClick={() => gold >= r.cost && onRedeemReward(r.id)}
          >
            <div className="reward-top">
              <TileSprite tile={r.icon} scale={2} />
              <span className="cost-badge"><span className="gold-coin-sm" />{r.cost}</span>
            </div>
            <div className="reward-name">{r.name}</div>
            <div className="reward-desc">{r.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}
