const jwt = require("jsonwebtoken");
const { User } = require("../model/task");

const requireAuth = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	console.log(req.headers);
	console.log("testtttttttt", authHeader);
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ error: "Missing authorization header222" });
	}

	try {
		// const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
		console.log('token',token);
		const decodedToken = jwt.verify(token, 'secret');
		const userId = decodedToken.id;

		const user = await User.findOne({ where: { id: userId } });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = { requireAuth };
