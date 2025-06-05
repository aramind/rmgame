const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const incrementStats = async (req, res) => {
  try {
    const { id, stat } = req.params;
    const validStats = ["wins", "losses", "draws"];

    if (!validStats.includes(stat)) {
      return sendResponse.failed(res, `Invalid stat type: ${stat}`, null, 400);
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { $inc: { [`stats.${stat}`]: 1 } },
      { new: true }
    );

    if (!updatedPlayer) {
      return sendResponse.failed(res, "Player not found", null, 404);
    }

    return sendResponse.success(res, `${stat} incremented`, updatedPlayer, 200);
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server error: Updating stats", error, 500);
  }
};

module.exports = incrementStats;
