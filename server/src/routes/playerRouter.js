const express = require("express");
const playerController = require("../controllers/players/playerController");

const router = express.Router();

router.post("", playerController.getPlayers);

module.exports = router;
