import { useState } from "react";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();
	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch("http://localhost:8000/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password }),
		});

		console.log(response);
		const json = await response.json();
		console.log(json);
		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (response.ok) {
			// save token in localstorage
			localStorage.setItem("user", JSON.stringify(json));
			// update auth from null to user data
			dispatch({
				type: "LOGIN",
				payload: json,
			});
			setIsLoading(false);
		}
	};
	return { login, isLoading, error };
};
