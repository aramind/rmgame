const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const verify = async (req, res) => {
  console.log("IN VERIY CONT");
  try {
    const { playerR, playerM } = req.body;

    if (!playerR || !playerM) {
      return sendResponse.failed(
        res,
        "Cannot play with the current number of players.",
        null,
        409
      );
    }

    const player1 = await Player.findOne({
      username: playerR.username,
      password: playerR.password,
    });
    const player2 = await Player.findOne({
      username: playerM.username,
      password: playerM.password,
    });

    let message = [];

    // if (!player1 || player1?.password !== playerR.password) {
    //   return sendResponse.failed(res, "Invalid credentials", null, 404);
    // }

    if (!player1) {
      message.push("Invalid credentials for PlayerR");
    }

    if (!player2) {
      message.push("Invalid credentials for PlayerM");
    }

    if (!player1 || !player2) {
      return sendResponse.failed(res, message.join(", "), null, 400);
    }

    const responsePayload = {
      players: {
        playerR: {
          _id: player1._id,
          username: player1.username,
          stats: player1.stats,
          profileImage: player1.profileImage,
          createdAt: player1.createdAt,
          updatedAt: player1.updatedAt,
          name: playerR.name,
        },
        playerM: {
          _id: player2._id,
          username: player2.username,
          stats: player2.stats,
          profileImage: player2.profileImage,
          createdAt: player2.createdAt,
          updatedAt: player2.updatedAt,
          name: playerM.name,
        },
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
