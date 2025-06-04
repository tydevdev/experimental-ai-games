# Gemini Game Experiments

This repo collects a handful of small web games created with help from the
Gemini 2.5 Pro (preview) model. The purpose is to explore how quickly AI can
bootstrap functional game prototypes.

Almost every entry was first drafted with Gemini and then cleaned up using
OpenAI's Codex-1 Research Preview for bug fixing. The exception is the simple
**Memory Match** game which was coded entirely with Codex to gauge its ability
to implement a small project from scratch. The games remain a bit rough around
the edges but showcase what modern models can accomplish with modest guidance.

## Games

Below is a quick rundown of the included prototypes. Every game except
**Memory Match** was generated with Gemini and later polished using Codex for
bug fixes.

- **Sudoku** – A themed puzzle generator with candidate notes and multiple
  difficulty levels.
- **Super Duper Whack‑A‑Moji** – Whack a flurry of emoji faces, earn XP and
  chase a local leaderboard.
- **Tap Blitz!** – Rapid‑fire target popping where combos boost your score.
- **Doodle Dash** – A simple drawing pad featuring undo/redo, color palettes
  and the ability to save your masterpiece.
- **Tetris** – Classic block stacking with touch controls, dynamic themes and
  high score tracking.
- **Duck Council** – Ask a question and receive a humorous fortune from a
  council of judgmental ducks.
- **Fruit Fusion** – Physics‑driven fruit merging puzzle inspired by the Suika
  game. Includes multiple visual themes and a leaderboard.
- **Memory Match** – Straightforward card matching made entirely with Codex as
  a reference point.

Codex also proved valuable for iterating on bug fixes across the whole repo,
catching edge cases that Gemini missed and tightening up the JavaScript.

## Running the games

Open `index.html` in a browser to access the menu of all games. Some browsers
restrict `localStorage` when opening files directly from disk, so launching a
simple local web server (for example `python3 -m http.server`) is recommended.

The leaderboard system uses `localStorage` to persist scores locally and across
games. A global leaderboard page aggregates results from individual games.
