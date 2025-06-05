const express = require("express");
const playerController = require("../controllers/players/playerController");

const router = express.Router();

router.get("/:id", playerController.getPlayer);
router.get("", playerController.getPlayers);
router.patch("/:id/increment/:stat", playerController.incrementStats);

module.exports = router;
