const errorMsg = require("../messages/errors/error.json");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log("userId", userId);

    if (!userId) {
      return res.status(400).json(errorMsg.EBO_003);
    }

    const { apikey } = req.headers;

    if (!apikey) {
      return res.status(400).json(errorMsg.EBO_006);
    }

    if (apikey) {
      const checkUser = await User.findOne({ apiKey: apikey });

      if (!checkUser) return res.status(400).json(errorMsg.EBO_004);

      if (checkUser.userId !== userId) {
        return res.status(400).json(errorMsg.EBO_005);
      }
      req.userId = userId;
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

module.exports = authMiddleware;