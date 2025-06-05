const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const getPlayers = async (req, res) => {
  try {
    const { fields, ...queryParams } = req.query;
    const requestedFields = fields
      ? fields
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f !== "password")
          .join(" ") + " -password"
      : "-password";

    const filter = { ...queryParams };

    const players = await Player.find(filter, requestedFields || undefined);

    if (!players) {
      return sendResponse.failed(res, "Player(s) not found", null, 404);
    }

    return sendResponse.success(
      res,
      "Players successfully retrieved",
      players,
      200
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error: Registering User.", error, 500);
  }
};

module.exports = getPlayers;
