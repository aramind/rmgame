const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    stats: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
      draws: { type: Number, default: 0 },
    },
    profileImage: {
      type: String, // URL or path to image
      default: "", // Optional
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);
