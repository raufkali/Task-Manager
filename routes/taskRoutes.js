const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const validate = require("../middleware/auth");

router.use(validate);
router.route("/").get(controller.getTasks).post(controller.createTasks);
router

  .route("/:id")
  .get(controller.getOneTasks)
  .put(controller.updateTasks)
  .delete(controller.deleteTasks);

module.exports = router;
