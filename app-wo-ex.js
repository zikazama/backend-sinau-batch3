// create http server without express
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 5000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Log the request URL
  console.log(`Request URL: ${req.url}`);

  // Serve the index.html file
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    // give json response
    res.write("<h1>Hello, World!</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
