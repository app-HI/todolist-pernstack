import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { signup, error, isLoading } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
	};
	return (
		<form className="signup_container" onSubmit={handleSubmit}>
			<h3>Register page</h3>
			<label>Email</label>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label>password</label>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button disabled={isLoading}>Register</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Register;
