import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PLAYERS, ALL_CHORES, REWARDS } from './data';
import { todayKey, weekKey, monthKey, dateSeededMonster, randomMonster, getLevelFromXP, critChanceForLevel } from './logic';
import PlayerCard from './components/PlayerCard';
import ChoreGrid from './components/ChoreGrid';
import RewardGrid from './components/RewardGrid';
import HistoryTab from './components/HistoryTab';
import DungeonBackground from './components/DungeonBackground';
import TileSprite from './components/TileSprite';
import Celebration from './components/Celebration';
import { playHit, playKill, playFanfare, playUndo, playRedeem, playCrit } from './sounds';

const API = '/api';

const DEFAULT_STATE = {
  gold: { matt: 0, erin: 0, hazel: 0 },
  xp: { matt: 0, erin: 0, hazel: 0 },
  dailyDone: {},
  weeklyDone: {},
  monthlyDone: {},
  weekKey: '',
  todayKey: '',
  monthKey: '',
  history: [],
  monsterDamage: {},
  monsterPenalties: {},
  streaks: { matt: 0, erin: 0, hazel: 0 },
  assignedMonsters: {},
};

export default function App() {
  const [serverState, setServerState] = useState(null);
  const [selected, setSelected] = useState(null);
  const [currentTab, setCurrentTab] = useState('chores');
  const [toast, setToast] = useState({ msg: '', visible: false });
  const [loading, setLoading] = useState(true);
  const [lastHits, setLastHits] = useState({});
  const [celebration, setCelebration] = useState(false);
  const lastActionAt = useRef(0);

  // Shows a toast notification for 2.5 seconds.
  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }, []);

  // Persists the current game state to the backend via POST /state.
  const saveState = useCallback(async (state) => {
    try {
      await fetch(`${API}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
    } catch (e) {
      console.error('Save failed', e);
    }
  }, []);

  // Inspects raw server state and applies any time-based resets that happened while the app was closed.
  // Handles: daily rollover (chores reset, monster penalty charged, new monster assigned),
  // weekly reset (weeklyDone cleared), monthly reset (monthlyDone cleared), and initial monster assignment.
  // Returns { state, changed, penaltyMsgs } — caller saves state if changed is true.
  const applyAutoResets = useCallback((raw) => {
    const state = { ...DEFAULT_STATE, ...raw };

    // migrate old points field to gold
    if (raw.points && !raw.gold) state.gold = raw.points;

    let changed = false;
    const penaltyMsgs = [];

    // Ensure monsters are assigned (first load or migration)
    if (!state.assignedMonsters || Object.keys(state.assignedMonsters).length === 0) {
      const monsters = {};
      PLAYERS.forEach(pl => { monsters[pl.id] = randomMonster(pl.id); });
      state.assignedMonsters = monsters;
      changed = true;
    }

    if (state.todayKey !== todayKey()) {
      const yKey = state.todayKey;
      const newStreaks = { ...(state.streaks || { matt: 0, erin: 0, hazel: 0 }) };

      if (yKey) {
        PLAYERS.forEach(pl => {
          // Use stored monster for yesterday's penalty/streak calc
          const m = state.assignedMonsters?.[pl.id] || dateSeededMonster(pl.id, yKey);
          const dmg = (state.monsterDamage?.[pl.id]?.[yKey]) || 0;
          if (dmg >= m.maxHP) {
            newStreaks[pl.id] = (newStreaks[pl.id] || 0) + 1;
          } else {
            newStreaks[pl.id] = 0;
            const pKey = `${pl.id}_${yKey}`;
            if (!(state.monsterPenalties || {})[pKey]) {
              state.gold = { ...state.gold, [pl.id]: Math.max(0, (state.gold[pl.id] || 0) - m.atk) };
              state.monsterPenalties = { ...state.monsterPenalties, [pKey]: true };
              state.history = [...(state.history || []), { type: 'penalty', player: pl.name, name: m.name, pts: m.atk }];
              penaltyMsgs.push(`⚠ ${pl.name}'s ${m.name} attacked! -${m.atk} gold`);
            }
          }
        });
      }

      // Assign fresh random monsters for the new day
      const newMonsters = {};
      PLAYERS.forEach(pl => { newMonsters[pl.id] = randomMonster(pl.id); });
      state.assignedMonsters = newMonsters;
      state.streaks = newStreaks;
      state.dailyDone = {};
      state.todayKey = todayKey();
      changed = true;
    }

    if (state.weekKey !== weekKey()) {
      state.weeklyDone = {};
      state.weekKey = weekKey();
      changed = true;
    }

    if (state.monthKey !== monthKey()) {
      state.monthlyDone = {};
      state.monthKey = monthKey();
      changed = true;
    }

    return { state, changed, penaltyMsgs };
  }, []);

  // Fetches state from the server and applies auto-resets.
  // isInitial=true: always runs and sets loading=false when done.
  // isInitial=false: skipped if a user action occurred in the last 3 seconds (avoids overwriting optimistic state).
  const loadState = useCallback(async (isInitial = false) => {
    if (!isInitial && Date.now() - lastActionAt.current < 3000) return;

    try {
      const res = await fetch(`${API}/state`);
      const fetched = await res.json();
      const { state: after, changed, penaltyMsgs } = applyAutoResets(fetched);

      if (changed) await saveState(after);

      setServerState(after);

      if (isInitial && penaltyMsgs.length) {
        setTimeout(() => showToast(penaltyMsgs[0]), 800);
      }
    } catch (e) {
      console.error('Load failed', e);
      if (isInitial) {
        const { state: fresh } = applyAutoResets({});
        setServerState(fresh);
      }
    }

    if (isInitial) setLoading(false);
  }, [applyAutoResets, saveState, showToast]);

  useEffect(() => {
    loadState(true);
  }, [loadState]);

  useEffect(() => {
    const id = setInterval(() => loadState(false), 5000);
    return () => clearInterval(id);
  }, [loadState]);

  // Optimistically updates local state and persists to backend.
  // Sets lastActionAt so the polling loop won't overwrite the change for 3 seconds.
  const updateState = useCallback(async (newState) => {
    lastActionAt.current = Date.now();
    setServerState(newState);
    await saveState(newState);
  }, [saveState]);

  // Toggles the selected player; clicking the already-selected player deselects them.
  const selectPlayer = useCallback((id) => {
    setSelected(prev => prev === id ? null : id);
  }, []);

  // Marks a chore as done by the selected player.
  // Applies damage to their assigned monster (doubled on crit), awards gold and XP on kill,
  // plays appropriate sound, triggers all-done celebration if every player finishes today.
  const claimChore = useCallback(async (choreId) => {
    if (!selected || !serverState) return;
    const chore = ALL_CHORES.find(c => c.id === choreId);
    const storeKey = chore.freq === 'daily' ? 'dailyDone' : chore.freq === 'weekly' ? 'weeklyDone' : 'monthlyDone';
    const store = serverState[storeKey];
    if (store[choreId]) return;

    const player = PLAYERS.find(p => p.id === selected);
    const tKey = todayKey();
    const m = serverState.assignedMonsters?.[selected] || dateSeededMonster(selected, tKey);
    const prevDmg = (serverState.monsterDamage?.[selected]?.[tKey]) || 0;

    // Crit roll — based on player's current level
    const playerXp = serverState.xp?.[selected] || 0;
    const { level } = getLevelFromXP(playerXp);
    const isCrit = prevDmg < m.maxHP && Math.random() < critChanceForLevel(level);
    const actualPts = isCrit ? chore.pts * 2 : chore.pts;

    const newDmg = prevDmg + actualPts;
    const hp = Math.max(0, m.maxHP - newDmg);
    const justKilled = hp === 0 && prevDmg < m.maxHP;

    // XP for killing a monster
    const xpGain = justKilled ? Math.max(2, Math.ceil(m.gold / 3)) : 0;
    const newXp = { ...(serverState.xp || { matt: 0, erin: 0, hazel: 0 }), [selected]: playerXp + xpGain };
    const { level: newLevel } = getLevelFromXP(playerXp + xpGain);
    const leveledUp = justKilled && newLevel > level;

    const newState = {
      ...serverState,
      [storeKey]: { ...store, [choreId]: selected },
      gold: justKilled
        ? { ...serverState.gold, [selected]: (serverState.gold[selected] || 0) + m.gold }
        : serverState.gold,
      xp: newXp,
      history: [
        ...(serverState.history || []),
        { type: 'chore', player: player.name, name: chore.name, pts: actualPts, crit: isCrit },
        ...(justKilled ? [{ type: 'gold', player: player.name, name: m.name, pts: m.gold }] : []),
      ],
      monsterDamage: {
        ...serverState.monsterDamage,
        [selected]: { ...(serverState.monsterDamage?.[selected] || {}), [tKey]: newDmg },
      },
    };

    await updateState(newState);

    setLastHits(prev => ({ ...prev, [selected]: { pts: actualPts, ts: Date.now(), crit: isCrit } }));

    if (isCrit && !justKilled) {
      playCrit();
    } else if (justKilled) {
      playKill();
      const allDone = PLAYERS.every(pl => {
        const plDmg = (newState.monsterDamage?.[pl.id]?.[tKey]) || 0;
        const plM = newState.assignedMonsters?.[pl.id] || dateSeededMonster(pl.id, tKey);
        return plDmg >= plM.maxHP;
      });
      if (allDone) {
        setTimeout(() => { playFanfare(); setCelebration(true); }, 600);
      }
    } else {
      playHit(chore.pts);
    }

    const critTag = isCrit ? ' ⚡ CRIT!' : '';
    const levelTag = leveledUp ? ` Level up! → Lv ${newLevel}` : '';
    const msg = justKilled
      ? `${player.name} slew the ${m.name}!${critTag} +${m.gold} gold${levelTag}`
      : `${player.name} hits ${m.name} for ${actualPts}!${critTag} HP: ${hp}/${m.maxHP}`;
    showToast(msg);
  }, [selected, serverState, updateState, showToast]);

  // Reverses a chore claim by the selected player.
  // Restores monster HP (and removes gold if the kill is being undone).
  const unclaimChore = useCallback(async (choreId) => {
    if (!selected || !serverState) return;
    const chore = ALL_CHORES.find(c => c.id === choreId);
    const storeKey = chore.freq === 'daily' ? 'dailyDone' : chore.freq === 'weekly' ? 'weeklyDone' : 'monthlyDone';
    const store = serverState[storeKey];
    const claimedBy = store[choreId];
    if (!claimedBy || claimedBy !== selected) return;

    const player = PLAYERS.find(p => p.id === selected);
    const tKey = todayKey();
    const m = serverState.assignedMonsters?.[selected] || dateSeededMonster(selected, tKey);
    const prevDmg = (serverState.monsterDamage?.[selected]?.[tKey]) || 0;
    const newDmg = Math.max(0, prevDmg - chore.pts);
    const wasKillShot = prevDmg >= m.maxHP && newDmg < m.maxHP;

    const updatedStore = { ...store };
    delete updatedStore[choreId];

    const newState = {
      ...serverState,
      [storeKey]: updatedStore,
      gold: wasKillShot
        ? { ...serverState.gold, [selected]: Math.max(0, (serverState.gold[selected] || 0) - m.gold) }
        : serverState.gold,
      monsterDamage: {
        ...serverState.monsterDamage,
        [selected]: { ...(serverState.monsterDamage?.[selected] || {}), [tKey]: newDmg },
      },
    };

    await updateState(newState);
    playUndo();
    showToast(`${player.name} undid: ${chore.name}`);
  }, [selected, serverState, updateState, showToast]);

  // Spends a player's gold to redeem a reward after a browser confirm dialog.
  const redeemReward = useCallback(async (rewardId) => {
    if (!selected || !serverState) return;
    const reward = REWARDS.find(r => r.id === rewardId);
    const player = PLAYERS.find(p => p.id === selected);
    const gold = serverState.gold[selected] || 0;
    if (gold < reward.cost) return;
    if (!confirm(`Redeem "${reward.name}" for ${reward.cost} gold?`)) return;

    const newState = {
      ...serverState,
      gold: { ...serverState.gold, [selected]: gold - reward.cost },
      history: [...(serverState.history || []), { type: 'reward', player: player.name, name: reward.name, pts: reward.cost }],
    };

    await updateState(newState);
    playRedeem();
    showToast(`${player.name} redeemed: ${reward.name}!`);
  }, [selected, serverState, updateState, showToast]);

  // Manual full reset: clears gold, all done-maps, damage, penalties, and streaks.
  // Re-randomizes monsters. XP and levels are intentionally preserved.
  const resetWeek = useCallback(async () => {
    if (!confirm('Reset chores, gold, and monsters? History will be kept.')) return;
    const freshMonsters = {};
    PLAYERS.forEach(pl => { freshMonsters[pl.id] = randomMonster(pl.id); });
    const newState = {
      ...serverState,
      gold: { matt: 0, erin: 0, hazel: 0 },
      dailyDone: {},
      weeklyDone: {},
      monthlyDone: {},
      monsterDamage: {},
      monsterPenalties: {},
      streaks: { matt: 0, erin: 0, hazel: 0 },
      assignedMonsters: freshMonsters,
    };
    // Note: xp and levels persist across resets intentionally
    await updateState(newState);
  }, [serverState, updateState]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text2)', fontSize: 14 }}>
        Loading…
      </div>
    );
  }

  const state = serverState;

  return (
    <>
    <DungeonBackground />
    <div className="board" style={{ position: 'relative', zIndex: 1 }}>
      <div className="header">
        <span className="title"><TileSprite tile={118} display={18} /> Choreboard</span>
        <div className="tabs">
          <button className={`tab${currentTab === 'chores' ? ' active' : ''}`} onClick={() => setCurrentTab('chores')}>
            <TileSprite tile={118} display={14} /> Chores
          </button>
          <button className={`tab${currentTab === 'rewards' ? ' active' : ''}`} onClick={() => setCurrentTab('rewards')}>
            <TileSprite tile={72} display={14} /> Rewards
          </button>
          <button className={`tab${currentTab === 'history' ? ' active' : ''}`} onClick={() => setCurrentTab('history')}>
            <TileSprite tile={116} display={14} /> History
          </button>
        </div>
        <button className="reset-btn" onClick={resetWeek}><TileSprite tile={115} display={12} /> Reset week</button>
      </div>

      <div className="players">
        {PLAYERS.map(p => (
          <PlayerCard
            key={p.id}
            player={p}
            gold={state.gold[p.id] || 0}
            xp={state.xp?.[p.id] || 0}
            isSelected={selected === p.id}
            onClick={() => selectPlayer(p.id)}
            monsterDamage={state.monsterDamage}
            lastHit={lastHits[p.id]}
            streak={state.streaks?.[p.id] || 0}
            monster={state.assignedMonsters?.[p.id]}
          />
        ))}
      </div>

      <div>
        {currentTab === 'chores' && (
          selected
            ? <ChoreGrid
                selectedPlayerId={selected}
                dailyDone={state.dailyDone}
                weeklyDone={state.weeklyDone}
                monthlyDone={state.monthlyDone || {}}
                onClaimChore={claimChore}
                onUnclaimChore={unclaimChore}
              />
            : <div className="no-select">Select a hero above to see their quests.</div>
        )}
        {currentTab === 'rewards' && (
          selected
            ? <RewardGrid
                selectedPlayerId={selected}
                gold={state.gold[selected] || 0}
                onRedeemReward={redeemReward}
              />
            : <div className="no-select">Select a hero above to browse the shop.</div>
        )}
        {currentTab === 'history' && (
          <HistoryTab history={state.history || []} />
        )}
      </div>

      <div className={`toast${toast.visible ? ' show' : ''}`}>{toast.msg}</div>
    </div>
    {celebration && <Celebration onDismiss={() => setCelebration(false)} />}
    </>
  );
}
