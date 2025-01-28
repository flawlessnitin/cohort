// Middleware for handling auth
function adminMiddleware(req, res, next) {
  const token = req.headers.authorization; // bearer token
  const jwtToken = token.split(" ")[1];
  const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
  if (decodedValue.username) {
    next();
  } else {
    res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}

module.exports = adminMiddleware;
