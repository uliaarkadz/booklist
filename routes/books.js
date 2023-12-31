/**
 * Dependencies
 */
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");

/**
 * Routes INDUCESS
 */
// Index - GET render all of the books
router.get("/", bookController.index);

// New - GET for the form to create a new book
router.get("/new", bookController.newForm);

// DELETE
router.delete("/:id", bookController.destroy);

// UPDATE
router.put("/:id", bookController.edit);

// Create - POST
router.post("/", bookController.create);

// EDIT
router.get("/edit/:id", bookController.edit);

// Seed - GET
router.get("/seed", bookController.seed);

// Show - GET rendering only one book
router.get("/:id", bookController.show);

// Export our router
module.exports = router;
