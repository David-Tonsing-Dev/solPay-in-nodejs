const errorMsg = require("../messages/errors/error.json");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
 
  try {
    let token = req.headers.authorization;
    const {userId} = req.body;

    if (!token) {
      return res.status(400).json(errorMsg.EBO_003);
    }

     token = token.split(" ")[1];


    if (token && token === process.env.APIKEY) {
      req.userId = userId;
    } else {
      return res.status(400).json(errorMsg.EBO_004);
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

module.exports = authMiddleware;
