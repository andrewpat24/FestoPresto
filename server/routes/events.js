const express = require("express");
const router = express.Router();

// Mongoose
const mongoose = require("mongoose");
const Events = mongoose.model("events");

router.get("/", (req, res) => {
  res.send({
    path: "/",
    message: "Root GET working on /routes"
  });
});

module.exports = router;
