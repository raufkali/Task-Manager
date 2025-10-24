const asynchHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// ERROR FUNCTION
const sendErr = (body, status, next) => {
  const err = new Error();
  err.message = body;
  err.status = status;
  next(err);
};

// Getting all users here:
const getAllUsers = asynchHandler(async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json({
    message: "Get All Users",
    body: allUsers,
  });
});
// Register user here
const registerUser = asynchHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    sendErr("All Fields are mendatory!", 400, next);
    return;
  }
  // checking if the email is allready taken
  const exsisted = await User.findOne({ email: email });
  if (exsisted) {
    sendErr("User already Registered using This Email.", 400, next);
    return;
  }
  // Creating new User here
  // encrypting the password first
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPass,
    role,
  });
  if (!newUser) {
    sendErr("User Creation Error!", 400, next);
    return;
  }
  res.status(200).json({
    message: "User Registered Successfull",
    body: {
      username,
      email,
      role,
    },
  });
});

// Login user here
const loginUser = asynchHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    sendErr("All Fields are mendatory!", 400, next);
    return;
  }
  // checking if the user exsists
  const exsist = await User.findOne({ email: email });
  if (!exsist) {
    sendErr("Email not Found", 400, next);
    return;
  }

  // checking if the pass is valid
  const isValid = await bcrypt.compare(password, exsist.password);
  if (!isValid) {
    sendErr("Unauthorized Access!", 401, next);
    return;
  }
  const authToken = jwt.sign(
    {
      user: {
        id: exsist.id,
        username: exsist.username,
        email: exsist.email,
        role: exsist.role,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  if (!authToken) {
    sendErr("Can't Create Auth Token", 401, next);
    return;
  }
  res.status(200).json({
    message: "User Logined",
    authToken,
  });
});

// see who is currently Logged In
const currentUser = asynchHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    sendErr("NO User Found", 400, next);
    return;
  }

  res.status(200).json({
    message: "Current User Info",
    body: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = { registerUser, loginUser, currentUser, getAllUsers };
