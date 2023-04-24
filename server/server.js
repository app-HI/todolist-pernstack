const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./model/task");
const tasksRouter = require("./routes/tasks");
const app = express();
const port = process.env.SERVERPORT || 8001;
const main = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		await sequelize.sync();
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
// CRUD
app.use("/", tasksRouter);

//
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
main();
