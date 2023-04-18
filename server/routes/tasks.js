const expres = require("express");
const router = expres.Router();

const {
	createNewTask,
	getAllTodos,
	getOneTask,
	updateTask,
	deleteTask,
} = require("../controller/taskController");

router.post("/", createNewTask);
router.get("/", getAllTodos);
router.get("/:id", getOneTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
