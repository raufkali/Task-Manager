const asyncHandler = require("express-async-handler");

const adminAuth = asyncHandler(async (req, res, next) => {
  const role = req.user.role;
  if (role != "admin") {
    const err = new Error();
    err.message = "This Role is Un-authorized!";
    err.status = 401;
    next(err);
    return;
  }
  next();
});

module.exports = adminAuth;
