require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (userid) => {
  const payload = {
    user: {
      user_id: userid
    }
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1hr"})
}