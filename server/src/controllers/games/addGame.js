const mongoose = require("mongoose");
const Game = require("../../models/Game");
const Player = require("../../models/Player");
const sendResponse = require("../../utils/sendResponse");

const addGame = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let transactionCommitted = false;
  const gameData = req.body;

  try {
    const game = {
      playerR: gameData.playerR,
      playerM: gameData.playerM,
      displayNames: gameData.displayNames,
      board: gameData.board,
      winner: gameData?.winner,
      loser: gameData?.loser,
      isDraw: gameData?.isDraw,
    };

    const newGame = new Game(game);

    if (gameData.isDraw) {
      await Player.updateMany(
        { _id: { $in: [game.playerR, game.playerM] } },
        { $inc: { "stats.draws": 1 } },
        { session }
      );
    } else if (gameData.winner && gameData.loser) {
      await Player.findByIdAndUpdate(
        gameData.winner,
        { $inc: { "stats.wins": 1 } },
        { session }
      );
      await Player.findByIdAndUpdate(
        gameData.loser,
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
