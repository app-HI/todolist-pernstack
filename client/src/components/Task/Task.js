import React, { useEffect, useState } from "react";
import axios from "axios";
import "./task.css";

function Task() {
	const [task, setTask] = useState(null);
	const url = "http://localhost:8000";
	const handleDelete = async (id) => {
		axios.delete("http://localhost:8000/" + id).then((res) => {
			console.log(res);
			console.log(res.data);

			const posts = task.filter((item) => item.id !== id);
			// this.setState({ posts });
			console.log(posts);
			setTask(posts);
		});
	};
	const handleUpdate = async (id) => {
		console.log(id);
	};
	useEffect(() => {
		axios.get(url).then((response) => {
			setTask(response.data);
		});
	}, []);

	if (!task) return null;

	return (
		<div className="task-container">
			<div className="task-top-header">
				<div className="date-container">
					<h2>thursday, 10th</h2>
					<p>
						<span>12</span> task
					</p>
					<button>+</button>
				</div>
				<br />
				<p>december</p>
			</div>
			<div className="task-bottom-container">
				{task.map((item, id) => {
					return (
						<div key={id} className="task-content-item">
							<div className="left-content">
								<input type="checkbox" defaultChecked={item.completed} />
								<p>{item.title}</p>
							</div>
							<span>
								{new Date(item.createdAt).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
							<div>
								<button onClick={() => handleUpdate(item.id)}>update</button>
								<button onClick={() => handleDelete(item.id)}>delete</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Task;
