const Game = require("../../models/Game");
const sendResponse = require("../../utils/sendResponse");

const getGames = async (req, res) => {
  try {
    const { fields, page, limit, ...queryParams } = req.query;

    const requestedFields = fields
      ? fields
          .split(",")
          .map((f) => f.trim())
          .join(" ")
      : "";

    const filter = { ...queryParams };

    const query = Game.find(filter, requestedFields || undefined)
      .sort({ createdAt: -1 })
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

    // Apply pagination ONLY if both page and limit are provided
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);

      if (!isNaN(pageNum) && !isNaN(limitNum)) {
        query.skip((pageNum - 1) * limitNum).limit(limitNum);
      }
    }

    const games = await query;

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
