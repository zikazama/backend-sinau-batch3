// create route for todos with CommonJS syntax
const express = require("express");
const { getTodosHandler, addTodoHandler, updateTodoHandler, deleteTodoHandler, getDetailTodosHandler } = require("../handlers/todos.handler.js");
const loggingMiddleware = require("../middlewares/logging.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Define the routes for todos
router.get("/", loggingMiddleware, getTodosHandler); // Get all todos
router.get("/:id", getDetailTodosHandler); // Get all todos
router.post("/", addTodoHandler); // Add a new todo
router.put("/:id", updateTodoHandler); // Update a todo by ID
router.delete("/:id", deleteTodoHandler); // Delete a todo by ID

// Export the router
module.exports = router;