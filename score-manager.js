const ScoreManager = {
  prefix: 'ai_games_',
  suffix: '_scores_v1',
  maxEntries: 10,
  getKey(game) {
    return `${this.prefix}${game}${this.suffix}`;
  },
  async loadAll() {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix) && key.endsWith(this.suffix)) {
        const game = key.slice(this.prefix.length, key.length - this.suffix.length);
        try {
          result[game] = JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
          console.error('Failed to parse scores for', game, e);
          result[game] = [];
        }
      }
    }
    return result;
  },
  async load(game) {
    try {
      const data = localStorage.getItem(this.getKey(game));
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to load scores for', game, e);
      return [];
    }
  },
  async add(game, name, score, ascending = false) {
    const list = await this.load(game);
    list.push({ name, score });
    list.sort((a, b) => ascending ? a.score - b.score : b.score - a.score);
    const trimmed = list.slice(0, this.maxEntries);
    try {
      localStorage.setItem(this.getKey(game), JSON.stringify(trimmed));
    } catch (e) {
      console.error('Failed to save scores for', game, e);
    }
    return trimmed;
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

function renderScoreList(element, entries, showGame = false) {
  element.innerHTML = entries.length === 0 ? '<li>No scores yet!</li>' :
    entries.map((e, i) => {
      const gamePart = showGame ? `<span class="game">${escapeHtml(e.game)}</span> ` : '';
      return `<li><span class="rank">${i + 1}.</span> ${gamePart}<span class="name">${escapeHtml(e.name)}</span> <span class="score">${e.score}</span></li>`;
    }).join('');
}
