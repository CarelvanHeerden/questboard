import React from 'react';
import { PLAYERS } from '../data';
import { getChoresFor } from '../logic';
import TileSprite from './TileSprite';

// Maps a point value to a CSS class for the damage badge colour.
function dmgClass(p) {
  return p === 1 ? 'pts-1' : p === 2 ? 'pts-2' : p === 3 ? 'pts-3' : 'pts-5';
}

// Renders a single chore tile. Clicking claims the chore for the selected player,
// or undoes it if the same player already claimed it.
function ChoreCard({ chore, dailyDone, weeklyDone, monthlyDone, selectedPlayerId, onClaim, onUnclaim }) {
  const store = chore.freq === 'daily' ? dailyDone : chore.freq === 'weekly' ? weeklyDone : monthlyDone;
  const claimedById = store[chore.id];
  const isDone = !!claimedById;
  const dp = isDone ? PLAYERS.find(p => p.id === claimedById) : null;
  const canUndo = isDone && claimedById === selectedPlayerId;

  function handleClick() {
    if (isDone) {
      if (canUndo) onUnclaim(chore.id);
    } else {
      onClaim(chore.id);
    }
  }

  return (
    <div
      className={`chore${isDone ? ' done' : ''}${canUndo ? ' undoable' : ''}`}
      onClick={handleClick}
      title={canUndo ? 'Tap to undo' : undefined}
    >
      <div className="chore-top">
        <TileSprite tile={chore.icon} scale={2} />
        <span className={`pts-badge ${dmgClass(chore.pts)}`}>
          <TileSprite tile={118} display={10} />
          {chore.pts}
        </span>
      </div>
      <div className="chore-name">{chore.name}</div>
      {isDone && (
        <div className="done-by">{canUndo ? '↩ undo' : `✔ ${dp ? dp.name : 'done'}`}</div>
      )}
    </div>
  );
}

export default function ChoreGrid({ selectedPlayerId, dailyDone, weeklyDone, monthlyDone, onClaimChore, onUnclaimChore }) {
  const chores = getChoresFor(selectedPlayerId);
  const daily   = chores.filter(c => c.freq === 'daily');
  const weekly  = chores.filter(c => c.freq === 'weekly');
  const monthly = chores.filter(c => c.freq === 'monthly');

  const cardProps = { selectedPlayerId, dailyDone, weeklyDone, monthlyDone: monthlyDone || {}, onClaim: onClaimChore, onUnclaim: onUnclaimChore };

  return (
    <div className="chore-sections">
      <div>
        <div className="section-label">Daily Quests <span className="reset-info">— resets at midnight</span></div>
        <div className="chores">
          {daily.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
        </div>
      </div>
      {weekly.length > 0 && (
        <div>
          <div className="section-label">Weekly Quests <span className="reset-info">— resets Sunday</span></div>
          <div className="chores">
            {weekly.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
          </div>
        </div>
      )}
      {monthly.length > 0 && (
        <div>
          <div className="section-label">Monthly Quests <span className="reset-info">— resets 1st of month</span></div>
          <div className="chores">
            {monthly.map(c => <ChoreCard key={c.id} chore={c} {...cardProps} />)}
          </div>
        </div>
      )}
    </div>
  );
}
