// create route for todos with CommonJS syntax
const express = require("express");
const { getTodos, addTodo, updateTodo, deleteTodo, getDetailTodos } = require("../handlers/todos.handler.js");
const loggingMiddleware = require("../middlewares/logging.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

// Define the routes for todos
router.get("/", loggingMiddleware, getTodos); // Get all todos
router.get("/:id", getDetailTodos); // Get all todos
router.post("/", addTodo); // Add a new todo
router.put("/:id", updateTodo); // Update a todo by ID
router.delete("/:id", deleteTodo); // Delete a todo by ID

// Export the router
module.exports = router;