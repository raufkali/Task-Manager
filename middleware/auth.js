const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  // Check if Authorization header exists and starts with "Bearer"
  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1]; // Extract the token part
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.error(err);
        err.message = "Authtoken Error!";
        err.status = 401;
        return next(err); // Pass error to the next middleware
      }

      // Attach the decoded user information to the request
      req.user = decode.user;
      // Continue to the next middleware/route handler
      next();
    });
  } else {
    // Return error if no token is provided
    res.status(401).json({ message: "No token provided" });
  }
};

module.exports = auth;
