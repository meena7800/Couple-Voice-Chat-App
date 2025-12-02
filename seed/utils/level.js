// naive level up: every 100 XP -> 1 level (you can replace with levels_table)
function addXP(user, xpToAdd) {
  user.xp += xpToAdd;
  const prevLevel = user.level;
  const newLevel = Math.floor(user.xp / 100); // example
  user.level = newLevel;
  return { leveledUp: newLevel > prevLevel, newLevel };
}

module.exports = { addXP };
