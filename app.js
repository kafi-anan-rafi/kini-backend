const express = require("express");
const app = express();

require("dotenv").config();
require("./config/mongooseConfig");
const path = require("path");
const cookieParser = require("cookie-parser");
const ownerRouter = require("./routes/ownerRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/owners", ownerRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Baag!" });
});

app.all("/*", (req, res, next) => {
  const err = new Error("Resource not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error!",
  });
});

app.listen(PORT, () => {
  console.log(`[App running on http://localhost:${PORT}]`);
});
