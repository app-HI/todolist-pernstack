import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
	const navigate = useNavigate();
	const url = "http://localhost:8000/register";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		const dataValues = {
			email,
			password,
		};
		try {
			const response = await axios.post(url, dataValues).then((res) => {
				console.log(res);
				console.log(res.data);
			});
			console.log(response);
			const token = response.headers.authorization;
			console.log(token);
			if (!token) {
				throw new Error("Token not found");
			}

			localStorage.setItem("token", token);
			//work with token in axios headers??!!
			navigate("/");
		} catch (error) {
			console.log(error);
		}
		//send req to backend
		setEmail("");
		setPassword("");
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
			/>
			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
			/>
			<button>Register</button>
		</form>
	);
};

export default Register;
