const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../model/task");

const Register = async (req, res) => {
	const { email, password } = req.body;
	const matched_users = await User.findAll({
		where: Sequelize.or({ email }),
	});
	if (matched_users.length === 0) {
		const passwordHash = bcrypt.hashSync(password, 10);
		const user = await User.create({
			email,
			password: passwordHash,
		});
		const token = jwt.sign(
			{ user_id: user.id, email },
			process.env.SECRET_JWT,
			{
				expiresIn: "2h",
			}
		);

		res.status(201).header("Authorization", `Bearer ${token}`).json({
			userId: user.id,
			email: user.email,
		});
	} else {
		res.status(400).json({ message: "exist" });
	}
};

const Login = async (req, res) => {
	const { email, password } = req.body;
	const matched_users = await User.findAll({
		where: Sequelize.and({ email }),
	});
	if (matched_users.length > 0) {
		let user = matched_users[0];
		let passwordHash = user.password;
		if (bcrypt.compareSync(password, passwordHash)) {
			const token = jwt.sign(
				{ user_id: user.id, email },
				process.env.SECRET_JWT,
				{
					expiresIn: "2h",
				}
			);
			// Set token in response header
			res.status(200).header("Authorization", `Bearer ${token}`).json({
				userId: user.id,
				emil: user.email,
			});
		} else {
			res.redirect("/login");
		}
	} else {
		res.status(400).json({ message: "not exist!" });
	}
};
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden" });
		}
		req.user = user;
		next();
	});
};

module.exports = { Login, Register, verifyToken };
