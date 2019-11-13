require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();

const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

// Routes
const authRouter = require("./routes/auth");
app.use("/", authRouter);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port} .`);
});
