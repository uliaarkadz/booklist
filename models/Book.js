/**
 * Dependancies
 */
const mongoose = require("mongoose");

//Create schema

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  completed: Boolean,
});

//compose model from schema

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
