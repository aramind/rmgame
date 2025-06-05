const express = require("express");
const gameController = require("../controllers/games/gameController");

const router = express.Router();

router.post("", gameController.addGame);
router.get("/:id", gameController.getGameById);
router.get("", gameController.getGames);

module.exports = router;
