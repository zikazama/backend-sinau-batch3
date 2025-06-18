// Logging ini untuk mencatat setiap request yang masuk ke server
const logging = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
  next();
}
module.exports = logging;