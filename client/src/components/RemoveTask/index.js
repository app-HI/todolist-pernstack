import axios from "axios";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const RemoveTask = ({ task, setTask, item }) => {
	const { user } = useAuthContext();
	const handleDelete = async (id) => {
		console.log(id);
		await axios
			.delete("http://localhost:8000/task/" + id, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((res) => {
				console.log(res);
				console.log(res.data);

				const posts = task.filter((item) => item.id !== id);
				console.log(posts);
				setTask(posts);
			});
	};
	return (
		<button
			style={{ border: "none", width: "100%" }}
			onClick={() => handleDelete(item.id)}
		>
			<img width={20} height={20} src="./assets/delete.svg" alt="delete" />
		</button>
	);
};

export default RemoveTask;
