const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const errorHandler = require("./middleware/errorHandler");
dotenv.config();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());
connectDB();

// Allow frontend on port 5173 (default for Vite)
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust if your frontend is running on a different port
    credentials: true,
  })
);
// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ErrorHandling
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Can't Find the Route";
  next(err);
});
app.use(errorHandler);
// running server
app.listen(port, () => {
  console.log("[+] App started on port", port);
});
