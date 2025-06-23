const pool = require('../config/pg');

// create table todos
const createTodosTable = async () => {
  const { rows } = await pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255), completed BOOLEAN)');
  return rows;
};

const getTodos = async () => {
  const { rows } = await pool.query('SELECT * FROM todos');
  return rows;
};

const getTodoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return rows[0];
};

const addTodo = async (todo) => {
  const { rows } = await pool.query('INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *', [todo.title, todo.completed]);
  return rows[0];
};

const updateTodo = async (id, todo) => {
  const { rows } = await pool.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *', [todo.title, todo.completed, id]);
  return rows[0];
};

const deleteTodo = async (id) => {
  const { rows } = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};


// create todos model with a simple array
// const todos = [
//   { id: "1", title: "Learn Node.js", completed: false },
//   { id: "2", title: "Build a REST API", completed: false },
//   { id: "3", title: "Deploy to Heroku", completed: false }
// ];

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  createTodosTable,
  getTodoById
};