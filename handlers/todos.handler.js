// create a handler for todos
const todos = require("../models/todos.model.js");
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const getTodos = (req, res) => {
  let filteredTodos = todos;

  // Check if search query parameter exists
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filteredTodos = todos.filter(todo => searchRegex.test(todo.title));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  const output = {
    message: "List of todos",
    data: filteredTodos,
    count: filteredTodos.length,
    status: "success",
  };
  res.write(JSON.stringify(output));
  res.end();
};

const addTodo = async (req, res) => {
  let body = req.body || "";

  const joiSchema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(30)
      .required(),
    completed: Joi.boolean().required(),
    other: Joi.string()
      .min(3)
      .max(30)
      .required(),
  });

  const { error } = await joiSchema.validateAsync({ 
    title: req.body.title, 
    completed: req.body.completed, 
    other: req.body.other 
  });
  if (error) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Invalid request", message: error.details[0].message }));
    res.end();
    return;
  }

  const newTodo = {...body, id: uuidv4()};
  todos.push(newTodo);
  res.writeHead(201, { "Content-Type": "application/json" });
  const output = {
    message: "Todo added successfully",
    data: newTodo,
    status: "success",
  };
  res.write(JSON.stringify(output));
  res.end();
};

const getDetailTodos = (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  const output = {
    message: "Detail of todo",
    data: todo,
    status: "success",
  };
  if (todo) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Todo not found" }));
  }
  res.end();
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  let body = req.body || "";
  const updatedTodo = body;
  const output = {
    message: "Todo updated successfully",
    data: updatedTodo,
    status: "success",
  };
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Todo not found" }));
  }
  res.end();
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  const output = {
    message: "Todo deleted successfully",
    status: "success",
  };
  if (index !== -1) {
    todos.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" }); // No Content
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Todo not found" }));
  }
  res.end();
};

module.exports = {
  getTodos,
  getDetailTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
