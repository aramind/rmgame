const express = require("express");
const gameController = require("../controllers/games/gameController");

const router = express.Router();

router.post("", gameController.addGame);

module.exports = router;
