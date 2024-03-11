const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./router/users.js");
const authRoute = require("./router/auth.js");
const postRoute = require("./router/posts.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.get("/users", (req, res) => {
  res.send("Welcome to users page");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
