/**
 * dependancies
 */
require("dotenv").config();
require("./config/db");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();
const { PORT = 3013 } = process.env;
const Book = require("./models/Book");
/**
 * middleware
 */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

/**
 * routes and router
 */
//index
app.get("/books", async (req, res) => {
  //find all of the books and render it in index.ejs
  let books = await Book.find({});
  res.render("index.ejs", {
    books: books.reverse(),
  });
});
//new
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});
//create POST
app.post("/books", async (req, res) => {
  try {
    if (req.body.completed === "on") {
      req.body.completed = true;
    } else {
      req.body.completed = false;
    }
    let newBook = await Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    res.send(err);
  }
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  try {
    // Find a book and then delete
    let deletedBook = await Book.findByIdAndDelete(req.params.id);
    console.log(deletedBook);
    // redirect back to the index
    res.redirect("/books");
  } catch (error) {
    res.status(500).send("something went wrong when deleting");
  }
});

//EDIT
app.get("/books/edit/:id", async (req, res) => {
  try {
    let updatedBook = await Book.findById(req.params.id);
    res.render("edit.ejs", { book: updatedBook });
  } catch (error) {
    res.send(error);
  }
});
//UPDATE
app.put("/books/:id", async (req, res) => {
  // handle our checkbox
  try {
    if (req.body.completed === "on") {
      req.body.completed = true;
    } else {
      req.body.completed = false;
    }
    // Then find by id and update with the req.body
    // findByIdAndUpdate - id , data to update, options
    let updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // redirect to the show route with the updated book
    res.redirect(`/books/${updatedBook._id}`);
  } catch (error) {
    res.send("something went wrong in this route");
  }
});

//show - Get
app.get("/books/:id", async (req, res) => {
  let foundBook = await Book.findById(req.params.id);
  res.render("show.ejs", { book: foundBook });
});
/**
 * listner
 */
app.listen(PORT, () => console.log(`Listning to the sounds of ${PORT}`));
