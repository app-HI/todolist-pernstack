const expres = require("express");
const { Login, Register } = require("../controller/userController");

const setupRoutes = (app) => {
	const router = expres.Router();

	router.post("/login", Login);
	router.post("/register", Register);

	app.use("/", router);
};

module.exports = { setupRoutes };
