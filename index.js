const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
require("dotenv").config();
require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  console.log("GET REQ");
  res.send("GETTING REQUEST SUCCESSFULLY");
});

app.listen(PORT, () => {
  console.log(`Listening to the PORT : ` + PORT);
});
