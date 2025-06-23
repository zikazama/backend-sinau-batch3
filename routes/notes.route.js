// create route for notes with CommonJS syntax
const express = require("express");
const { 
  getNotesHandler, 
  addNoteHandler, 
  updateNoteHandler, 
  deleteNoteHandler, 
  getDetailNoteHandler
} = require("../handlers/notes.handler.js");
const loggingMiddleware = require("../middlewares/logging.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Define the routes for notes
router.get("/", loggingMiddleware, getNotesHandler); // Get all notes with optional filters
router.get("/:id", getDetailNoteHandler); // Get note by ID
router.post("/", addNoteHandler); // Add a new note
router.put("/:id", updateNoteHandler); // Update a note by ID
router.delete("/:id", deleteNoteHandler); // Delete a note by ID

// Export the router
module.exports = router; 