const express = require("express");
const app = express();

require("dotenv").config();
require("./config/mongoose.config");
const path = require("path");
const cookieParser = require("cookie-parser");
const ownersRouter = require("./routes/owners.route");
const usersRouter = require("./routes/users.route");
const productsRouter = require("./routes/products.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.all("/*", (req, res) => {
  res.status(404).send("Resourse not found");
});

app.listen(PORT, () => {
  console.log(`[App running on http://localhost:${PORT}]`);
});
