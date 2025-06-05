const register = require("./register");
const verify = require("./verify");

const authController = {
  register,
  verify,
};

module.exports = authController;
