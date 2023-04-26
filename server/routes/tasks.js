const expres = require("express");

const {
	createNewTask,
	getAllTodos,
	getOneTask,
	updateTask,
	deleteTask,
} = require("../controller/taskController");
const { requireAuth } = require("../middleware/requireAuth");

const setupRoutes = (app) => {
	const router = expres.Router();

	router.use(requireAuth);

	router.get("/", getAllTodos);
	router.post("/", createNewTask);
	router.get("/:id", getOneTask);
	router.patch("/:id", updateTask);
	router.delete("/:id", deleteTask);

	app.use("/task", router);
};

module.exports = { setupRoutes };
