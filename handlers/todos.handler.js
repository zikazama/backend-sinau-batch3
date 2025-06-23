// create a handler for todos
const { getTodos, addTodo, updateTodo, deleteTodo, createTodosTable, getTodoById } = require("../models/todos.model.js");
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');


const getTodosHandler = async (req, res) => {
  await createTodosTable();
  let filteredTodos = await getTodos();

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

const addTodoHandler = async (req, res) => {
  try {

    let body = req.body || "";

    const joiSchema = Joi.object({
      title: Joi.string()
        .min(3)
        .max(30)
        .required(),
      completed: Joi.boolean().required()
    });
  
    const { error } = await joiSchema.validateAsync({
      title: req.body.title,
      completed: req.body.completed,
    });

    if (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Invalid request", message: error.details[0].message }));
      res.end();
      return;
    }

    const newTodo = {
      title: req.body.title,
      completed: req.body.completed,
    };

    await addTodo(newTodo);
    res.writeHead(201, { "Content-Type": "application/json" });
    const output = {
      message: "Todo added successfully",
      data: newTodo,
      status: "success",
    };
    res.write(JSON.stringify(output));
    res.end();
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Internal server error", message: error.details[0].message }));
    res.end();
  }
};

const getDetailTodosHandler = async (req, res) => {
  const id = req.params.id;
  const todo = await getTodoById(id);
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

const updateTodoHandler = async (req, res) => {
  const id = req.params.id;
  let body = req.body || "";
  const updatedTodo = body;
  await updateTodo(id, updatedTodo);
  const output = {
    message: "Todo updated successfully",
    data: updatedTodo,
    status: "success",
  };
  if (updatedTodo) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Todo not found" }));
  }
  res.end();
};

const deleteTodoHandler = async (req, res) => {
  const id = req.params.id;
  const deletedTodo = await deleteTodo(id);
  const output = {
    message: "Todo deleted successfully",
    status: "success",
  };
  if (deletedTodo) {
    res.writeHead(200, { "Content-Type": "application/json" }); // No Content
    res.write(JSON.stringify(output));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Todo not found" }));
  }
  res.end();
};

module.exports = {
  getTodosHandler,
  getDetailTodosHandler,
  addTodoHandler,
  updateTodoHandler,
  deleteTodoHandler,
};
