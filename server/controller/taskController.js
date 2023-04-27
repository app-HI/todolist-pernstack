const { Task } = require("../model/task");

const getAllTodos = async (req, res) => {
	try {
		if (req.url === "/favicon.ico") {
			return;
		}
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
//
const getOneTask = async (req, res) => {
	try {
		const taskId = req.params.id;

		const task = await Task.findOne({ where: { id: taskId } });
		if (!task) {
			res.status(404).json({ message: "Task not found" });
			return;
		}
		res.status(200).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
//

const createNewTask = async (req, res) => {
	try {
		const { title, completed } = req.body;
		const task = await Task.create({ title, completed });
		res.status(201).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const updateTask = async (req, res) => {
	try {
		const { completed, title } = req.body;
		const taskId = req.params.id;

		const task = await Task.findOne({ where: { id: taskId } });
		if (!task) {
			res.status(404).json({ message: "Task not found" });
			return;
		}
		await task.update({ completed, title });
		res.end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const deleteTask = async (req, res) => {
	try {
		const taskId = req.params.id;

		const task = await Task.findOne({ where: { id: taskId } });
		if (!task) {
			res.status(404).json({ message: "Task not found" });
			return;
		}
		await task.destroy();
		res.send("Task deleted successfully");
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getAllTodos,
	getOneTask,
	createNewTask,
	updateTask,
	deleteTask,
};
