const express = require("express");
const bestURLPaymentRouter = express.Router();
const {
  getQRCode,
  verifyTransaction,
} = require("../controllers/bestURLPaymentController");
const authMiddleware = require("../middlewares/authMiddleware");

bestURLPaymentRouter.post("/getQRCode", getQRCode); // authMiddleware
bestURLPaymentRouter.post("/verify-transaction", verifyTransaction); // authMiddleware

module.exports = bestURLPaymentRouter;
