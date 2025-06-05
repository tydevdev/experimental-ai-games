const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'leaderboard.json');
const PLAYER_FILE = path.join(__dirname, 'player-progress.json');
const MAX_ENTRIES_PER_GAME = 50;

app.use(express.json());

function loadScores() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveScores(scores) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2));
}

function addScore(game, name, score) {
  const scores = loadScores();
  scores.push({ game, name, score });
  scores.sort((a, b) => b.score - a.score);
  saveScores(scores);
}

function loadPlayer() {
  try {
    const data = fs.readFileSync(PLAYER_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { xp: 0 };
  }
}

function savePlayer(player) {
  fs.writeFileSync(PLAYER_FILE, JSON.stringify(player, null, 2));
}

app.get('/scores', (req, res) => {
  res.json(loadScores());
});

app.get('/scores/:game', (req, res) => {
  const all = loadScores();
  res.json(all.filter(e => e.game === req.params.game));
});

app.post('/scores', (req, res) => {
  const { game, name, score } = req.body || {};
  if (typeof game !== 'string' || typeof name !== 'string' || typeof score !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  addScore(game, name, score);
  res.json({ success: true });
});

app.get('/player', (req, res) => {
  res.json(loadPlayer());
});

app.post('/player/xp', (req, res) => {
  const { xp } = req.body || {};
  if (typeof xp !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const player = loadPlayer();
  player.xp = (player.xp || 0) + xp;
  savePlayer(player);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Leaderboard/Player server running on port ${PORT}`);
});
