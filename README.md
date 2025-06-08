# Experimental AI Playground

This repo collects a handful of small web games and interactive experiments
created with help from the Gemini 2.5 Pro (preview) model. The goal is to see
how quickly AI can bootstrap functional prototypes.

Almost every entry was first drafted with Gemini and then cleaned up using
OpenAI's Codex-1 Research Preview for bug fixing. The exception is the simple
**Memory Match** game which was coded entirely with Codex to gauge its ability
to implement a small project from scratch. The games remain a bit rough around
the edges but showcase what modern models can accomplish with modest guidance.

## Games

Below is a quick rundown of the playable games. Every game except **Memory
Match** was generated with Gemini and later polished using Codex for bug fixes.

- **Sudoku** – A themed puzzle generator with candidate notes and multiple
  difficulty levels.
- **Super Duper Whack‑A‑Moji** – Whack a flurry of emoji faces, earn XP and
  chase a local high score list.
- **Tap Blitz!** – Rapid‑fire target popping where combos boost your score.
- **Tetris** – Classic block stacking with touch controls, dynamic themes and
  high score tracking.
- **Fruit Fusion** – Physics‑driven fruit merging puzzle inspired by the Suika
  game. Includes multiple visual themes and high scores.
- **Memory Match** – Straightforward card matching made entirely with Codex as
  a reference point.

- **Mini Racer** – Drive along a curvy track and stay on the road or face a countdown restart.
- **Word Search** – Find hidden words in a letter grid and race for the best time.
## Other Experiences

Not everything here is a traditional game. The following pages are playful
experiments built with the same AI-assisted approach.

- **Doodle Dash** – A simple drawing pad featuring undo/redo, color palettes
  and the ability to save your masterpiece.
- **Duck Council** – Ask a question and receive a humorous fortune from a
  council of judgmental ducks.

## Websites

- **Whale Wonders** – A simple informational site celebrating whales and their conservation.

Codex also proved valuable for iterating on bug fixes across the whole repo,
catching edge cases that Gemini missed and tightening up the JavaScript.

## Running the demos

Open `index.html` in a browser to access the menu of all games and experiments.
Some browsers restrict `localStorage` when opening files directly from disk, so
launching a simple local web server (for example `python3 -m http.server`) is
recommended.
High scores are now managed by `score-manager.js`, which keeps a simple per-game list in `localStorage`.
## AI Development Log

This project tracks which language model produced each major piece of code. The log below summarizes notable updates.

> **Note for AI maintainers**
> Use the actual calendar date for each entry rather than automatically incrementing the previous day. Keep the list sequential by recording a change number as shown below.

1. **2025-05-12:** Initial Sudoku prototype and index page created with **Gemini**.
2. **2025-05-15:** Added Whack‑A‑Moji, Tap Blitz!, Doodle Dash, Tetris, Duck Council and Fruit Fusion using **Gemini**.
3. **2025-05-16:** Minor fixes, renames and README updates driven by **Gemini**.
4. **2025-06-04:** Added a global leaderboard and addressed various bugs with **Codex** assistance.
5. **2025-06-04:** Introduced the **Memory Match** game, built entirely with **Codex**.
6. **2025-06-04:** Codex adjustments to the global leaderboard and Fruit Fusion difficulty plus expanded documentation.

7. **2025-06-04:** Refreshed the landing page and README with separate
  "experiences" section using **Codex**.

8. **2025-06-05:** Added the "Whale Wonders" informational site and updated the
  main menu with a new Websites category using **Codex**.
9. **2025-06-06:** Major upgrade to Whale Wonders with an interactive carousel, additional pages and new UI elements using **Codex**.
10. **2025-06-07:** Unified leaderboards across all games and added a simple
  Express server option using **Codex**.
11. **2025-06-07:** Introduced a global player progress system and reorganized the
  landing menu using **Codex**.

12. **2025-06-08:** Reworked the leaderboard system with a new `ScoreManager` using **Codex**.
13. **2025-06-08:** Removed the global player progress and leaderboard pages using **Codex**.
14. **2025-06-08:** Overhauled Mini Racer with a dynamic track and off-road timer using **Codex**.
15. **2025-06-08:** Added a simple Word Search puzzle using **Codex**.
16. **2025-06-08:** Added guidelines on accurate logging and numbered each entry using **Codex**.
Please continue appending significant changes here along with the model used so future AI maintainers know the project history.

