const Game = require("../../models/Game");
const sendResponse = require("../../utils/sendResponse");

const getGames = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;

    const requestedFields = fields
      ? fields
          .split(",")
          .map((f) => f.trim())
          .join(" ")
      : "";

    const filter = { ...queryParams };

    const games = await Game.find(filter, requestedFields || undefined)
      .populate({
        path: "playerR",
        select: "username profileImage _id",
      })
      .populate({
        path: "playerM",
        select: "username profileImage _id",
      })
      .populate({
        path: "winner",
        select: "username profileImage _id",
      });

    if (!games || games.length === 0) {
      return sendResponse.failed(res, "Game(s) not found", null, 404);
    }

    return sendResponse.success(
      res,
      "Games successfully retrieved",
      games,
      200
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error: Retrieving Games", error, 500);
  }
};

module.exports = getGames;
