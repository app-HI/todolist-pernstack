const { Task } = require("../model/task");

const getAllTodos = async (req, res) => {
	try {
		const userId = req.user.id;
		const tasks = await Task.findAll({ where: { UserId: userId } });
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
		const UserId = req.user.id;
		// console.log(userId);
		console.log('userId',req.user.id);
		const { title, completed } = req.body;
		const task = await Task.create({ title, completed, UserId });
		//
		// let task = await req.user.createTask({ title, completed });

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
