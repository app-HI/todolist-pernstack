import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
	const { user } = useAuthContext();
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={user ? <Home /> : <Navigate to={"/login"} />}
					/>
					<Route
						path="/login"
						element={!user ? <Login /> : <Navigate to={"/"} />}
					/>
					<Route
						path="/register"
						element={!user ? <Register /> : <Navigate to={"/"} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
