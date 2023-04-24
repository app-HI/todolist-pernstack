const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
	`postgres://${process.env.USERNAME1}:${encodeURIComponent(
		process.env.PASSWORD
	)}@${process.env.URL}:${process.env.PORT}/${process.env.DBNAME}`
);

const Task = sequelize.define("Task", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	completed: {
		type: DataTypes.BOOLEAN,
	},
});
const User = sequelize.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = { Task, sequelize, User };
