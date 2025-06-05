const getPlayer = require("./getPlayer");
const getPlayers = require("./getPlayers");
const incrementStats = require("./incrementStats");

const playerController = {
  getPlayers,
  getPlayer,
  incrementStats,
};

module.exports = playerController;
