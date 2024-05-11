const { generateApiKey } = require("generate-api-key");
const User = require("../models/userModel");
const ApiKey = require("../models/apiKeyModel");
const errorMsg = require("../messages/errors/error.json");

const signup = async (req, res) => {
  try {
    const { userId } = req.body;

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json(errorMsg.EBO_001);
    }

    const existingApiKey = await ApiKey.find();

    if (existingApiKey.length < 1)
      return res.status(401).json(errorMsg.EBO_004);

    await User.create({
      userId,
      apiKey: existingApiKey[0],
    });

    return res.status(200).json({
      success: true,
      apiKey: existingApiKey[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorMsg.EBO_002);
  }
};

module.exports = {
  signup,
};
