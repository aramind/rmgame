const express = require("express");
const playerController = require("../controllers/players/playerController");

const router = express.Router();

router.get("", playerController.getPlayers);

module.exports = router;
