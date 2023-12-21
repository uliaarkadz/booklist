/**
 * dependancies
 */
require("dotenv").config();
require("./config/db");
const express = require("express");
const morgan = require("morgan");

const app = express();
const { PORT = 3013 } = process.env;
const Book = require("./models/Book");
/**
 * middleware
 */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

/**
 * routes and router
 */
//index
//new
//create POST
app.post("/books", async (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }
  let newBook = await Book.create(req.body);
  res.send(newBook);
});
//show
/**
 * listner
 */
app.listen(PORT, () => console.log(`Listning to the sounds of ${PORT}`));
