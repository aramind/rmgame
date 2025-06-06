const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const getTopWinRatePlayers = async (req, res) => {
  try {
    const allPlayers = await Player.find({}, "username profileImage stats");

    const playersWithRatios = allPlayers
      .map((player) => {
        const { wins, losses, draws } = player.stats;
        const totalGames = wins + losses + draws;

        if (totalGames === 0) return null;

        return {
          _id: player._id,
          username: player.username,
          profileImage: player.profileImage,
          wins,
          losses,
          draws,
          totalGames,
          winRatio: parseFloat((wins / totalGames).toFixed(4)),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.winRatio - a.winRatio)
      .slice(0, 10);

    if (!playersWithRatios) {
      sendResponse.failed(res, "Not enough data yet.", null, 404);
    }

    return sendResponse.success(
      res,
      "Successfully retrieved top players.",
      playersWithRatios,
      201
    );
  } catch (error) {}
};

module.exports = getTopWinRatePlayers;
