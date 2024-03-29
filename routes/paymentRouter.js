const express = require("express");
const paymentRouter = express.Router();
const {
  getQRCode,
  verifyTransaction,
} = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

paymentRouter.post("/getQRCode", authMiddleware, getQRCode);
paymentRouter.post("/verify-transaction", authMiddleware, verifyTransaction);

module.exports = paymentRouter;
