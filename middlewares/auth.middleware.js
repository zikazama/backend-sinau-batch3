const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Authorization header is missing" }));
    res.end();
    return;
  }

  const token = authHeader.split(" ")[1];
  if (token !== "abc123") {
    res.writeHead(403, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ error: "Forbidden: Invalid token" }));
    res.end();
    return;
  }

  next();
}

module.exports = auth;