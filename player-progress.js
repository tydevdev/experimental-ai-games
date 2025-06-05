const PlayerProgress = {
  key: 'global_player_progress_v1',
  serverUrl: null,
  async load() {
    if (this.serverUrl) {
      try {
        const res = await fetch(this.serverUrl + '/player');
        return await res.json();
      } catch (e) {
        console.error('Failed to load remote player data', e);
      }
    }
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : { xp: 0 };
    } catch (e) {
      console.error('Failed to load player data', e);
      return { xp: 0 };
    }
  },
  async save(player) {
    if (this.serverUrl) {
      console.warn('save() should not be called when using server mode');
      return;
    }
    try {
      localStorage.setItem(this.key, JSON.stringify(player));
    } catch (e) {
      console.error('Failed to save player data', e);
    }
  },
  async addXP(amount) {
    if (this.serverUrl) {
      try {
        await fetch(this.serverUrl + '/player/xp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ xp: amount })
        });
        const data = await this.load();
        return data.xp;
      } catch (e) {
        console.error('Failed to submit xp', e);
        return 0;
      }
    }
    const player = await this.load();
    player.xp = (player.xp || 0) + amount;
    await this.save(player);
    return player.xp;
  },
  calculateLevel(xp) {
    let level = 1;
    let threshold = 100;
    while (xp >= threshold) {
      xp -= threshold;
      level++;
      threshold = Math.floor(threshold * 1.25);
    }
    return { level, currentXP: xp, nextLevelXP: threshold };
  }
};
