require("dotenv").config();

module.exports = (req, res, next) => {
  const endpoint = process.env.API_ENDPOINT
  const { email, username, password } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  try {
    if (req.path === endpoint + "/register") {
      if (![email, username, password].every(Boolean)) {
        return res.status(401).json({message: "Missing Credentials"});
      } else if (!validEmail(email)) {
        return res.status(401).json({message: "Invalid Email"});
      }
    } else if (req.path === endpoint + "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json({message: "Missing Credentials"});
      } else if (!validEmail(email)) {
        return res.status(401).json({message: "Invalid Email"});
      }
    }
  } catch (error) {
    next(error)
  }

  next();
};