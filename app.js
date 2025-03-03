const express = require("express");
const userRouter = require("./routes/user.routes");
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv");
dotenv.config();
const connectToDB=require('./config/db')
connectToDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/user", userRouter);
app.set("view engine", "ejs");
app
  .get("/", (req, res) => {
    res.render("index.ejs");
  })
  .listen(3000);
