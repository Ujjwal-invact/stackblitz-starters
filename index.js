const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Helper functions for database queries
const getAllGames = async () => {
  return await db.all('SELECT * FROM games');
};

const getGameById = async (id) => {
  return await db.get('SELECT * FROM games WHERE id = ?', id);
};

const getGamesByGenre = async (genre) => {
  return await db.all('SELECT * FROM games WHERE genre = ?', genre);
};

const getGamesByPlatform = async (platform) => {
  return await db.all('SELECT * FROM games WHERE platform = ?', platform);
};

const getGamesSortedByRating = async () => {
  return await db.all('SELECT * FROM games ORDER BY rating DESC');
};

const getAllPlayers = async () => {
  return await db.all('SELECT * FROM players');
};

const getPlayerById = async (id) => {
  return await db.get('SELECT * FROM players WHERE id = ?', id);
};

const getPlayersByPlatform = async (platform) => {
  return await db.all('SELECT * FROM players WHERE platform = ?', platform);
};

const getPlayersSortedByRating = async () => {
  return await db.all('SELECT * FROM players ORDER BY rating DESC');
};

const getAllTournaments = async () => {
  return await db.all('SELECT * FROM tournaments');
};

const getTournamentById = async (id) => {
  return await db.get('SELECT * FROM tournaments WHERE tournamentId = ?', id);
};

const getTournamentsByGameId = async (gameId) => {
  return await db.all('SELECT * FROM tournaments WHERE gameId = ?', gameId);
};

const getTournamentsSortedByPrizePool = async () => {
  return await db.all('SELECT * FROM tournaments ORDER BY prizePool DESC');
};

// Define endpoints

// Get all games
app.get('/games', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json({ games });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get game by ID
app.get('/games/details/:id', async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    if (game) {
      res.json({ game });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get games by genre
app.get('/games/genre/:genre', async (req, res) => {
  try {
    const games = await getGamesByGenre(req.params.genre);
    res.json({ games });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// https://codesandbox.io/p/devbox/express-demo-3h6w3x?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522cm0c6p9uq00063b6kmva575m6%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522cm0c6p9up00023b6kvzbc1hfv%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522cm0c6p9up00043b6kedt1kgvs%2522%257D%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522cm0c6p9uq00053b6kyeciumfr%2522%257D%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522cm0c6p9up00023b6kvzbc1hfv%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm0c6p9up00013b6k9ppljdnw%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252FREADME.md%2522%257D%255D%252C%2522id%2522%253A%2522cm0c6p9up00023b6kvzbc1hfv%2522%252C%2522activeTabId%2522%253A%2522cm0c6p9up00013b6k9ppljdnw%2522%257D%252C%2522cm0c6p9uq00053b6kyeciumfr%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522cm0c6p9uq00053b6kyeciumfr%2522%257D%252C%2522cm0c6p9up00043b6kedt1kgvs%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522cm0c6p9up00033b6k6a84eptk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%257D%255D%252C%2522id%2522%253A%2522cm0c6p9up00043b6kedt1kgvs%2522%252C%2522activeTabId%2522%253A%2522cm0c6p9up00033b6k6a84eptk%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D
// Get games by platform

app.get('/games/platform/:platform', async (req, res) => {
  try {
    const games = await getGamesByPlatform(req.params.platform);
    res.json({ games });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get games sorted by rating
app.get('/games/sort-by-rating', async (req, res) => {
  try {
    const games = await getGamesSortedByRating();
    res.json({ games });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all players
app.get('/players', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get player by ID
app.get('/players/details/:id', async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);
    if (player) {
      res.json({ player });
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get players by platform
app.get('/players/platform/:platform', async (req, res) => {
  try {
    const players = await getPlayersByPlatform(req.params.platform);
    res.json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get players sorted by rating
app.get('/players/sort-by-rating', async (req, res) => {
  try {
    const players = await getPlayersSortedByRating();
    res.json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tournaments
app.get('/tournaments', async (req, res) => {
  try {
    const tournaments = await getAllTournaments();
    res.json({ tournaments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tournament by ID
app.get('/tournaments/details/:id', async (req, res) => {
  try {
    const tournament = await getTournamentById(req.params.id);
    if (tournament) {
      res.json({ tournament });
    } else {
      res.status(404).json({ error: 'Tournament not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tournaments by game ID
app.get('/tournaments/game/:gameId', async (req, res) => {
  try {
    const tournaments = await getTournamentsByGameId(req.params.gameId);
    res.json({ tournaments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tournaments sorted by prize pool
app.get('/tournaments/sort-by-prize-pool', async (req, res) => {
  try {
    const tournaments = await getTournamentsSortedByPrizePool();
    res.json({ tournaments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
