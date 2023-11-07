const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");
const decodeToken = require("./services/isUserLoggedIn");
const AuthRouter = require("./api/routes/auth");
const config = require("./config/index");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Custom middleware to decode JWT token
app.use(decodeToken);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof validationResult) {
    return res.status(422).json({ errors: err.array() });
  }
  next(err);
});

// Routes
app.use("/api", AuthRouter);

// MongoDB connection
mongoose.connect(config.MongoDBURL);

// Start the server
app.listen(config.ServerPort, () => {
  console.log(`Server is running on port ${config.ServerPort}.`);
});
