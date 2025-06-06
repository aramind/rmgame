const getPlayer = require("./getPlayer");
const getPlayers = require("./getPlayers");
const getTopWinRatePlayers = require("./getTopWinRatePlayers");
const incrementStats = require("./incrementStats");

const playerController = {
  getPlayers,
  getPlayer,
  incrementStats,
  getTopWinRatePlayers,
};

module.exports = playerController;
