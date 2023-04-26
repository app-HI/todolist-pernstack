import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error("useAuthContext has to use into authcontextprovider");
	}
	return context;
};
