// create http server with express
const express = require("express");
const path = require("path");
const PORT = 5000;
const Joi = require('joi');
var cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
// app.options('*', cors());

app.use(express.static(path.join(__dirname, "public")));
// Middleware to parse JSON bodies
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

const customMiddleware = (req, res, next) => {
  console.log("Custom middleware called");
  next();
};

// Serve the index.html file for the root URL
app.get("/", (req, res) => {
  const query = req.query;
  if (query.name) {
    res.writeHead(200, { "Content-Type": "text/html" });
    // give json response
    res.write(`<h1>Hello, ${query.name}!</h1>`);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  // give json response
  res.write("<h1>Hello, lagi Sinau!</h1>");
  res.end();
});

app.post("/login", customMiddleware, async (req, res) => {
  try {


    const response = await fetch("https://jsonplaceholder.typicode.com/postss").catch(e => e.message);
    console.log(response);
    throw new Error("test");

    // validation
    const joiSchema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(30)
        .required()
    });

    await joiSchema.validateAsync({ username: req.body.username, password: req.body.password });

    // Simulate a login process
    const { username, password } = req.body;
    if (!username || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ error: "Username and password are required!" })
      );
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Login successful!", token: "Bearer abc123" }));
    res.end();
  } catch (error) {
    console.error("Error in /login route:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Internal Server Error", message: error.details[0].message }));
    res.end();
    return;
  }
});

// import todosRoute from "./routes/todos.route.js";
const todosRoute = require("./routes/todos.route.js");
const notesRoute = require("./routes/notes.route.js");
const db = require("./models");

// Test database connection on startup
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use("/todos", todosRoute);
app.use("/notes", notesRoute);

// middleware for error 404 routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route does not exist.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
