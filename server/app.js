const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRouter = require("./api/routes/auth");
const config = require("./config/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  if (err instanceof validationResult) {
    return res.status(422).json({ errors: err.array() });
  }
  next(err);
});

app.use("/api", AuthRouter);

mongoose.connect(config.MongoDBURL);

app.listen(config.ServerPort, () => {
  console.log(`Server is running on ${config.ServerPort} port.`);
});
