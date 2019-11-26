require("dotenv").config();

const path = require("path");
const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

// Cors
const cors = require("cors");
app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
require("./models/Users");

// Logging
const pino = require("express-pino-logger")();
app.use(pino);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Routes
const authRouter = require("./routes/auth-passport");
app.use("/auth", authRouter);

// Middleware
require("./middleware/passport");

// Session
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// Passport
const passport = require("passport");
require("./services/passport");
app.use(passport.initialize());
app.use(passport.session());

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port} .`);
});
