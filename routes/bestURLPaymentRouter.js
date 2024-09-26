const express = require("express");
const bestURLPaymentRouter = express.Router();
const {
  getQRCode,
  verifyTransaction,
} = require("../controllers/bestURLPaymentController");
const authMiddleware = require("../middlewares/authMiddleware");

bestURLPaymentRouter.post("/getQRCode", authMiddleware, getQRCode); //
bestURLPaymentRouter.post(
  "/verify-transaction",
  authMiddleware,
  verifyTransaction
); //

module.exports = bestURLPaymentRouter;
