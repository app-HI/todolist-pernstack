const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
// 	process.env.DB_NAME,
// 	process.env.DB_USER,
// 	process.env.DB_PASSWORD,
// 	{
// 		host: process.env.DB_HOST,
// 		dialect: "postgres",
// 		port: process.env.DB_PORT,
// 	}
// );
const sequelize = new Sequelize(
	`postgres://${process.env.USERNAME1}:${process.env.PASSWORD}@${process.env.URL}:${process.env.PORT}/${process.env.DBNAME}`
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

module.exports = { Task, sequelize };
