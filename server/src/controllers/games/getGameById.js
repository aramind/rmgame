const Game = require("../../models/Game");
const sendResponse = require("../../utils/sendResponse");

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const { fields } = req.query;

    const requestedFields = fields
      ? fields
          .split(",")
          .map((f) => f.trim())
          .join(" ")
      : "";

    const game = await Game.findById(id, requestedFields || undefined)
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

    if (!game) {
      return sendResponse.failed(res, "Game not found", null, 404);
    }

    return sendResponse.success(res, "Game successfully retrieved", game, 200);
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error: Retrieving Game", error, 500);
  }
};

module.exports = getGameById;
