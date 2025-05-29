const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
require("./models/db")

// Connecting to the MongoDB Client
const port = process.env.PORT;
const app = express();

// Middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());
app.use("/auth", require("./routes/auth.js"));

// Serve React Frontend
app.use(express.static(path.resolve(__dirname, "../Frontend/dist")));

// React Frontend Catch-All Route (MUST be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
