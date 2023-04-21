import axios from "axios";
import React from "react";

const RemoveTask = ({ task, setTask, item }) => {
	const handleDelete = async (id) => {
		console.log(id);
		axios.delete("http://localhost:8000/" + id).then((res) => {
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
