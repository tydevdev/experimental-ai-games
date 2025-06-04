# Gemini Game Experiments

This repo collects a handful of small web games created with help from the
Gemini 2.5 Pro (preview) model. The purpose is to explore how quickly AI can
bootstrap functional game prototypes.

Each game was initially produced with Gemini and later refined with OpenAI's
Codex-1 Research Preview. They remain fairly rough around the edges, but serve
as a useful snapshot of modern AI coding ability.

## Running the games

Open `index.html` in a browser to access the menu of all games. Some browsers
restrict `localStorage` when opening files directly from disk, so launching a
simple local web server (for example `python3 -m http.server`) is recommended.

The leaderboard system uses `localStorage` to persist scores locally and across
games. A global leaderboard page aggregates results from individual games.
