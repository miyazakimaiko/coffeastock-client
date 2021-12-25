require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const jwtToken = req.header("token")

    if (!jwtToken) {
      return res.status(500).json({
        message: "Authorization Denied"
      });
    }

  try {
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;
  } catch (error) {
    next(error);
  }
  next();
}