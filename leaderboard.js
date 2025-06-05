const GlobalLeaderboard = {
  key: 'global_leaderboard_v2',
  maxEntriesPerGame: 10,
  serverUrl: null,
  async load() {
    if (this.serverUrl) {
      try {
        const res = await fetch(this.serverUrl + '/scores');
        return await res.json();
      } catch (e) {
        console.error('Failed to load remote leaderboard', e);
      }
    }
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load leaderboard', e);
      return [];
    }
  },
  async loadGame(game) {
    const entries = await this.load();
    return entries.filter(e => e.game === game).slice(0, this.maxEntriesPerGame);
  },
  async save(entries) {
    if (this.serverUrl) {
      console.warn('save() should not be called when using server mode');
      return;
    }
    try {
      localStorage.setItem(this.key, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save leaderboard', e);
    }
  },
  async add(game, name, score) {
    if (this.serverUrl) {
      try {
        await fetch(this.serverUrl + '/scores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ game, name, score })
        });
      } catch (e) {
        console.error('Failed to submit score', e);
      }
      return this.loadGame(game);
    }
    const board = await this.load();
    board.push({ game, name, score });
    board.sort((a, b) => b.score - a.score);
    await this.save(board);
    return this.loadGame(game);
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderLeaderboardList(element, entries, showGame = false) {
  element.innerHTML = entries.length === 0 ? '<li>No scores yet!</li>' :
    entries.map((e, i) => {
      const gamePart = showGame ? `<span class="game">${escapeHtml(e.game)}</span> ` : '';
      return `<li><span class="rank">${i + 1}.</span> ${gamePart}<span class="name">${escapeHtml(e.name)}</span> <span class="score">${e.score}</span></li>`;
    }).join('');
}
