// create http server with express
const express = require("express");
const path = require("path");
const PORT = 5000;
const Joi = require('joi');

const app = express();
app.use(express.static(path.join(__dirname, "public")));
// Middleware to parse JSON bodies
app.use(express.json());

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

app.post("/login", customMiddleware, async(req, res) => {
  try {
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
app.use("/todos", todosRoute);

// middleware for error 404 routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route does not exist.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
