import { ALL_CHORES, MONSTERS, REWARDS } from './data';

// Returns "YYYY-M-D" string for today — used as the daily state reset key.
export function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Returns "YYYY-M-D" string for the Sunday that started the current week.
export function weekKey() {
  const d = new Date();
  const s = new Date(d);
  s.setDate(d.getDate() - d.getDay());
  return `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;
}

// Returns "YYYY-M" string for the current month — used as the monthly reset key.
export function monthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}`;
}

// Returns 0–6 day-of-week (0 = Sunday) for today, used to filter dow-restricted chores.
export function todayDow() {
  return new Date().getDay();
}

// Picks a random monster from the roster and resolves its maxHP based on player id.
// Hazel (kid) gets kidHP; adults get adultHP.
export function randomMonster(pid) {
  const m = MONSTERS[Math.floor(Math.random() * MONSTERS.length)];
  return { ...m, maxHP: pid === 'hazel' ? m.kidHP : m.adultHP };
}

// Deterministic fallback — picks a monster seeded from pid + dateKey so the
// same monster always appears for a given player/day without storing state.
export function dateSeededMonster(pid, dateKey) {
  const hash = `${pid}${dateKey}`.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const m = MONSTERS[hash % MONSTERS.length];
  return { ...m, maxHP: pid === 'hazel' ? m.kidHP : m.adultHP };
}

// Returns the chores visible to a given player today.
// Filters by who ('all' | 'kids' | 'adults') and optional dow (day-of-week).
export function getChoresFor(pid) {
  const dow = todayDow();
  const chores = pid === 'hazel'
    ? ALL_CHORES.filter(c => c.who === 'all' || c.who === 'kids')
    : ALL_CHORES.filter(c => c.who === 'all' || c.who === 'adults');
  return chores.filter(c => c.dow === undefined || c.dow === dow);
}

// Returns rewards purchasable by a given player.
export function getRewardsFor(pid) {
  if (pid === 'hazel') return REWARDS.filter(r => r.who === 'all' || r.who === 'kids');
  return REWARDS.filter(r => r.who === 'all' || r.who === 'adults');
}

// Converts total accumulated XP into level info.
// Thresholds grow linearly: level 1 → 2 costs 10 XP, level 2 → 3 costs 20 XP, etc.
// Returns { level, xpInLevel (progress toward next), xpNeeded (cost of next level) }.
export function getLevelFromXP(totalXp) {
  let xp = totalXp;
  let level = 1;
  let threshold = 10;
  while (xp >= threshold) {
    xp -= threshold;
    level++;
    threshold += 10;
  }
  return { level, xpInLevel: xp, xpNeeded: threshold };
}

// Returns the crit hit probability for a given level.
// Starts at 5% (level 1) and increases by 1% per level.
export function critChanceForLevel(level) {
  return 0.05 + (level - 1) * 0.01;
}
