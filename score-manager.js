const ScoreManager = {
  key: 'ai_games_scores_v1',
  maxEntries: 10,
  async loadAll() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Failed to load scores', e);
      return {};
    }
  },
  async load(game) {
    const all = await this.loadAll();
    return all[game] || [];
  },
  async saveAll(all) {
    try {
      localStorage.setItem(this.key, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save scores', e);
    }
  },
  async add(game, name, score) {
    const all = await this.loadAll();
    if (!all[game]) all[game] = [];
    all[game].push({ name, score });
    all[game].sort((a, b) => b.score - a.score);
    all[game] = all[game].slice(0, this.maxEntries);
    await this.saveAll(all);
    return all[game];
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
