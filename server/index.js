const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

// env
dotenv.config();
const { PORT = 3001, MONGO_CONNECT: DB } = process.env;

//routers
const authRouter = require("./src/routes/authRouter");
const playerRouter = require("./src/routes/playerRouter");
const gameRouter = require("./src/routes/gameRouter");

const app = express();

// configs

// middlewares
app.use([
  helmet(),
  express.json(),
  express.urlencoded({ extended: true }),
  morgan("combined"),
  cookieParser(),
]);

// rendering the static file for the client
app.use(express.static(path.join(__dirname, "../client/build")));

// base routes

app.use("/v1/auth", authRouter);
app.use("/v1/players", playerRouter);
app.use("/v1/games", gameRouter);
// authenticated routes

// for the static site
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// if not found
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
