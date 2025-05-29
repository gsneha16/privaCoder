const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL;

console.log(MONGO_URL);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("connection err to mongoDB", err);
  });
