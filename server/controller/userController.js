const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../model/task");
require("dotenv").config();
const createToken = (id) => {
	// return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: "3d" });
	return jwt.sign({ id }, 'secret' ,{ expiresIn: "3d" });
};

const Register = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		// Check if user with given email already exists
		const existingUser = await User.findOne({ where: { email } });

		if (existingUser) {
			return res.status(409).json({ error: "Email already in use" });
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const newUser = await User.create({
			email: email,
			password: hashedPassword,
		});

		const token = createToken(newUser.id);

		return res
			.status(200)
			.header("Authorization", `Bearer ${token}`)
			.json({ email, token: token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server Error" });
	}
};

const Login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			where: { email: email },
			// where: Sequelize.and({ email }),
		});

		if (!user || !bcrypt.compareSync(password, user.password)) {
			throw new Error();
		}

		const token = createToken(user.id);

		return res
			.status(200)
			.header("Authorization", `Bearer ${token}`)
			.json({ email, userId: user.id, token: token });
	} catch (error) {
		res.status(401).json({ error: "Invalid credentials" });
	}
};

module.exports = { Login, Register };
