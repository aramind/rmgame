const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const verify = async (req, res) => {
  try {
    const { username, password } = req.body;

    const player = await Player.findOne({ username });

    if (!player || player?.password !== password) {
      return sendResponse.failed(res, "Invalid credentials", null, 404);
    }

    const responsePayload = {
      player: {
        username: player.username,
        stats: player.stats,
        profileImage: player.profileImage,
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
      },
    };

    return sendResponse.success(
      res,
      "Verification successful.",
      responsePayload,
      200
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error: Verifying player.", error, 500);
  }
};

module.exports = verify;
