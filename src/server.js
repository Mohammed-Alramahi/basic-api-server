"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const clothesRouter = require("./routes/clothes");
const foodRouter = require("./routes/food");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/clothes", clothesRouter);
app.use("/api/v1/food", foodRouter);

app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("*", notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
