const mongoose = require("mongoose");
const Game = require("../../models/Game");
const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const addGame = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { game, winner, loser, isDraw } = req.body;

    const newGame = new Game(game);

    if (isDraw) {
      await Player.updateMany(
        { _id: { $in: [game.playerR, game.playerM] } },
        { $inc: { "stats.draws": 1 } },
        { session }
      );
    } else if (winner && loser) {
      await Player.findByIdAndUpdate(
        winner,
        { $inc: { "stats.wins": 1 } },
        { session }
      );
      await Player.findByIdAndUpdate(
        loser,
        { $inc: { "stats.losses": 1 } },
        { session }
      );
    } else {
      await session.abortTransaction();
      session.endSession();
      return sendResponse.failed(res, "Invalid game result data", null, 400);
    }

    const savedGame = await newGame.save({ session });

    await session.commitTransaction();
    transactionCommitted = true;
    session.endSession();

    return sendResponse.success(
      res,
      "Game and player stats updated successfully",
      savedGame,
      201
    );
  } catch (error) {
    if (!transactionCommitted) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(error);
    sendResponse.failed(res, "Server Error: Adding Game", error, 500);
  }
};

module.exports = addGame;
