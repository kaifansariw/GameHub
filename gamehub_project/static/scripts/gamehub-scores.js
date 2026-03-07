/**
 * GameHub Unified Score Tracking System
 * Persists high scores across all games using localStorage.
 * Provides a single API for saving/retrieving scores.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'gamehub_highscores';

  // Legacy localStorage keys used by individual games
  var LEGACY_KEYS = {
    'snake':       { key: 'snakeHighScore',   type: 'number' },
    '2048':        { key: '2048-best-score',   type: 'number' },
    'tic-tac-toe': { key: 'ticTacToeScores',   type: 'json'   },
  };

  function loadScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function persistScores(scores) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }

  /**
   * Import scores from legacy per-game localStorage keys
   * so existing players don't lose their progress.
   */
  function importLegacyScores() {
    var scores = loadScores();
    var dirty = false;

    for (var gameId in LEGACY_KEYS) {
      if (!LEGACY_KEYS.hasOwnProperty(gameId)) continue;
      var entry = LEGACY_KEYS[gameId];
      var raw = localStorage.getItem(entry.key);
      if (raw === null) continue;

      if (entry.type === 'number') {
        var val = Number(raw) || 0;
        if (!scores[gameId] || val > (scores[gameId].highScore || 0)) {
          scores[gameId] = scores[gameId] || {};
          scores[gameId].highScore = val;
          scores[gameId].lastPlayed = scores[gameId].lastPlayed || new Date().toISOString();
          dirty = true;
        }
      } else if (entry.type === 'json' && gameId === 'tic-tac-toe') {
        try {
          var ttt = JSON.parse(raw);
          var wins = (ttt.x || 0) + (ttt.o || 0);
          if (!scores[gameId] || wins > (scores[gameId].highScore || 0)) {
            scores[gameId] = scores[gameId] || {};
            scores[gameId].highScore = wins;
            scores[gameId].scoreLabel = 'Total Wins';
            scores[gameId].lastPlayed = scores[gameId].lastPlayed || new Date().toISOString();
            dirty = true;
          }
        } catch (e) { /* ignore parse errors */ }
      }
    }

    if (dirty) persistScores(scores);
    return scores;
  }

  /**
   * Save a high score for a game.
   * Only updates if the new score is higher (or scoreType is 'time-lower' for time-based games).
   *
   * @param {string} gameId   - Game identifier matching the id in the games array
   * @param {number} score    - The score value
   * @param {object} [opts]   - Optional: { scoreLabel: string, lowerIsBetter: boolean }
   */
  function saveScore(gameId, score, opts) {
    if (typeof gameId !== 'string' || typeof score !== 'number' || !isFinite(score)) return;

    opts = opts || {};
    var scores = loadScores();
    var existing = scores[gameId] || {};
    var currentBest = existing.highScore;
    var lowerIsBetter = opts.lowerIsBetter || false;

    var isNewBest = (currentBest === undefined || currentBest === null) ||
                    (lowerIsBetter ? score < currentBest : score > currentBest);

    if (isNewBest) {
      scores[gameId] = {
        highScore: score,
        lastPlayed: new Date().toISOString(),
        scoreLabel: opts.scoreLabel || existing.scoreLabel || 'High Score',
        lowerIsBetter: lowerIsBetter
      };
      persistScores(scores);
    } else {
      // Update lastPlayed even if not a new best
      scores[gameId] = existing;
      scores[gameId].lastPlayed = new Date().toISOString();
      persistScores(scores);
    }

    return isNewBest;
  }

  /**
   * Get highscore entry for a specific game.
   * @param {string} gameId
   * @returns {object|null} { highScore, lastPlayed, scoreLabel, lowerIsBetter }
   */
  function getScore(gameId) {
    var scores = loadScores();
    return scores[gameId] || null;
  }

  /**
   * Get all saved high scores.
   * @returns {object} Map of gameId → { highScore, lastPlayed, scoreLabel }
   */
  function getAllScores() {
    return loadScores();
  }

  /**
   * Get the count of games that have been played (have a score recorded).
   */
  function getGamesPlayedCount() {
    var scores = loadScores();
    return Object.keys(scores).length;
  }

  /**
   * Get total high score across all games (sum).
   */
  function getTotalScore() {
    var scores = loadScores();
    var total = 0;
    for (var id in scores) {
      if (scores.hasOwnProperty(id) && !scores[id].lowerIsBetter) {
        total += (scores[id].highScore || 0);
      }
    }
    return total;
  }

  // Run legacy import on load
  importLegacyScores();

  // Expose global API
  window.GameHubScores = {
    saveScore: saveScore,
    getScore: getScore,
    getAllScores: getAllScores,
    getGamesPlayedCount: getGamesPlayedCount,
    getTotalScore: getTotalScore,
    importLegacyScores: importLegacyScores
  };
})();
