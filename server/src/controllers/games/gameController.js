const addGame = require("./addGame");
const getGameById = require("./getGameById");
const getGames = require("./getGames");

const gameController = {
  addGame,
  getGames,
  getGameById,
};

module.exports = gameController;
