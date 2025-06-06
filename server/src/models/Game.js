const mongoose = require("mongoose");
const Player = require("./Player");

const GameSchema = new mongoose.Schema(
  {
    playerR: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
      required: true,
    },
    playerM: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
      required: true,
    },
    displayNames: {
      R: { type: String },
      M: { type: String },
    },
    board: {
      type: [String],
      default: ["", "", "", "", "", "", "", "", ""],
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
      default: null,
    },
    loser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
      default: null,
    },
    isDraw: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
