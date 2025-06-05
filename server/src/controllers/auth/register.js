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

    const existing = await Player.findOne({ username });
    if (existing) {
      return sendResponse.failed(res, "Name already taken!", username, 409);
    }

    // decided not to hashed IN THIS PROJECT, for SIMPLICITY of retreiving forgotten password
    const newPlayer = new Player({
      username,
      // password: hashPassword(password)
      password,
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
