const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainPassword) =>
  await bcrypt.hash(plainPassword, saltRounds);

const verifyPassword = async (plainPassword, hashedPassword) =>
  await bcrypt.compare(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  verifyPassword,
};
