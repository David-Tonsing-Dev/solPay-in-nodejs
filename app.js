require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { connectionWithMoralis } = require("./utils/helpers/index");

const app = express();
const PORT = process.env.PORT || 8000;

const userRouter = require("./routes/userRouters");
const bestURLPaymentRouter = require("./routes/bestURLPaymentRouter");
const kolKartPaymentRouter = require("./routes/kolKartPaymentRouter");

app.use(express.json());

app.use("/users", userRouter);
app.use("/besturl/payment", bestURLPaymentRouter);
app.use("/kolkart/payment", kolKartPaymentRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log("Database connection established");
    connectionWithMoralis();
  });
});
