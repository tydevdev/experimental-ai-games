class Leaderboard {
  constructor(gameKey, maxEntries = 10) {
    this.gameKey = gameKey;
    this.storageKey = `leaderboard_${gameKey}`;
    this.maxEntries = maxEntries;
  }
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load leaderboard', e);
      return [];
    }
  }
  save(entries) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save leaderboard', e);
    }
  }
  add(name, score) {
    const board = this.load();
    board.push({ name, score });
    board.sort((a, b) => b.score - a.score);
    const trimmed = board.slice(0, this.maxEntries);
    this.save(trimmed);
    GlobalLeaderboard.add(this.gameKey, name, score);
    return trimmed;
  }
  qualifies(score) {
    const board = this.load();
    if (score <= 0) return false;
    if (board.length < this.maxEntries) return true;
    return score > board[board.length - 1].score;
  }
}

const GlobalLeaderboard = {
  key: 'global_leaderboard_v1',
  maxEntries: 50,
  load() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load global leaderboard', e);
      return [];
    }
  },
  save(entries) {
    try {
      localStorage.setItem(this.key, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save global leaderboard', e);
    }
  },
  add(game, name, score) {
    const board = this.load();
    board.push({ game, name, score });
    board.sort((a, b) => b.score - a.score);
    this.save(board.slice(0, this.maxEntries));
  }
};

function renderLeaderboardList(element, entries, showGame = false) {
  element.innerHTML = entries.length === 0 ? '<li>No scores yet!</li>' :
    entries.map((e, i) => {
      const gamePart = showGame ? `<span class="game">${e.game}</span> ` : '';
      return `<li><span class="rank">${i + 1}.</span> ${gamePart}<span class="name">${e.name}</span> <span class="score">${e.score}</span></li>`;
    }).join('');
}
