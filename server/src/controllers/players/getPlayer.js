const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const { fields } = req.query;

    const requestedFields = fields
      ? fields
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f !== "password")
          .join(" ") + " -password"
      : "-password";

    const player = await Player.findById(id).select(requestedFields);

    if (!player) {
      return sendResponse.failed(res, "Player not found", null, 404);
    }

    return sendResponse.success(
      res,
      "Player successfully retrieved",
      player,
      200
    );
  } catch (error) {
    console.error(error);
    return sendResponse.failed(
      res,
      "Server Error: Getting Player.",
      error,
      500
    );
  }
};

module.exports = getPlayer;
