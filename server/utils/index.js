require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  jwtGenerator: (userid) => {
    const payload = {
      user: userid
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1hr"})
  }
};