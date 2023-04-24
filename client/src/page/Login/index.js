import React, { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
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
			<button>Login</button>
		</form>
	);
};

export default Login;
