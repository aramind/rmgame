const Player = require("../../models/Player");
const { hashPassword } = require("../../utils/password");
const sendResponse = require("../../utils/sendResponse");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse.failed(
        res,
        "Username and password are required.",
        null,
        400
      );
    }

    if (username.length < 3) {
      return sendResponse.failed(
        res,
        "Username must be at least 3 characters long.",
        null,
        400
      );
    }

    if (password.length < 4) {
      return sendResponse.failed(
        res,
        "Password must be at least 4 characters long.",
        null,
        400
      );
    }

    const existing = await Player.findOne({ username });
    if (existing) {
      return sendResponse.failed(res, "Name already taken!", username, 409);
    }

    // decided not to hashed IN THIS PROJECT, for SIMPLICITY of retreiving forgotten password
    const newPlayer = new Player({
      username,
      // password: hashPassword(password)
      password,
      profileImage: `https://api.dicebear.com/9.x/bottts/svg?seed=${username}`,
    });

    const createdPlayer = await newPlayer.save();

    return sendResponse.success(
      res,
      "User created. You can now start playing games.",
      createdPlayer,
      201
    );
  } catch (error) {
    console.error(error);
    sendResponse.failed(res, "Server Error: Registering User.", error, 500);
  }
};

module.exports = register;
