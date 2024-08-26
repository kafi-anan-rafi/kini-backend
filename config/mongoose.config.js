const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    debug("Database connected!");
  })
  .catch((err) => {
    debug(err.message);
  });

module.exports = mongoose;
