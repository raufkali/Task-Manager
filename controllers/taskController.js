const asynchHandler = require("express-async-handler");
const Task = require("../models/Task");

// ERROR FUNCTION
const sendErr = (body, status, next) => {
  const err = new Error();
  err.message = body;
  err.status = status;
  next(err);
};

// getting all tasks here
const getTasks = asynchHandler(async (req, res, next) => {
  const allTasks = await Task.find({ user: req.user.id });

  res.status(200).json({
    message: "Get All Tasks",
    body: allTasks,
  });
});

// creating new Task here
const createTasks = asynchHandler(async (req, res, next) => {
  const { title, description } = req.body;

  const newTask = await Task.create({
    title,
    description,
    user: req.user.id,
  });
  if (!newTask) {
    sendErr("Task Can't be created", 400, next);
    return;
  }
  res.status(200).json({
    message: "Task Created",
    body: newTask,
  });
});

// getting single Task by id here
const getOneTasks = asynchHandler(async (req, res, next) => {
  const oneTask = await Task.findById(req.params.id);
  if (!oneTask) {
    sendErr("Task Not Found!", 401, next);
    return;
  }
  res.status(200).json({
    message: "Get Task of ID: " + req.params.id,
    body: oneTask,
  });
});

// updating task here
const updateTasks = asynchHandler(async (req, res, next) => {
  const { title, description } = req.body;
  // checking if the tasks Exsists

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
    title,
    description,
    user: req.user.id,
    unique: true,
  });
  if (!updatedTask) {
    sendErr("Can't Update task", 401, next);
    return;
  }
  res.status(200).json({
    message: "Updated Task of ID: " + req.params.id,
    body: updatedTask,
  });
});

// deleting task here
const deleteTasks = asynchHandler(async (req, res, next) => {
  const delTask = await Task.findByIdAndDelete(req.params.id);
  if (!delTask) {
    sendErr("Task Can't be deleted", 401, next);
    return;
  }
  res.status(200).json({
    message: "Task Deleted of ID: " + req.params.id,
    body: delTask,
  });
});

module.exports = {
  getTasks,
  createTasks,
  updateTasks,
  getOneTasks,
  deleteTasks,
};
