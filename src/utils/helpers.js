require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const generateAuthToken = (payloadEmail) => jwt.sign(payloadEmail, secretKey);

const verifyAuthToken = (token) => jwt.verify(token, secretKey);

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
