import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./navbar.css";
function Header() {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const handleClick = () => {
		logout();
	};
	return (
		<div className="header-container">
			<Link to={"/"}>
				<h1>TodoList App</h1>
			</Link>
			<nav>
				{user && (
					<div className="navbar-container-logout">
						<span>{user.email}</span>
						<button onClick={handleClick}>Logout</button>
					</div>
				)}
				{!user && (
					<div className="navbar-container">
						<Link to={"/login"}>login</Link>
						<Link to={"/register"}>Register</Link>
					</div>
				)}
			</nav>
		</div>
	);
}

export default Header;
