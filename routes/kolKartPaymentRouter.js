const express = require("express");
const kolKartPaymentRouter = express.Router();
const {
  getQRCode,
  verifyTransaction,
} = require("../controllers/kolKartPaymentController");
const authMiddleware = require("../middlewares/authMiddleware");

kolKartPaymentRouter.post("/getQRCode", authMiddleware, getQRCode);
kolKartPaymentRouter.post(
  "/verify-transaction",
  authMiddleware,
  verifyTransaction
);

module.exports = kolKartPaymentRouter;
