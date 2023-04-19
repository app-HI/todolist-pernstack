import React, { useEffect, useState } from "react";
import axios from "axios";
import "./task.css";

function Task() {
	const [task, setTask] = useState(null);
	const [checked, setChecked] = useState(false);
	const [data, setData] = useState([]);
	const [titleValue, setTitleValue] = useState("");
	const [showForm, setShowForm] = useState(false);
	const url = "http://localhost:8000/";
	const handleSubmit = async (e) => {
		e.preventDefault();
		const itemsValue = {
			title: titleValue,
			completed: checked,
		};
		console.log(itemsValue);
		await axios.post(url, itemsValue).then((res) => {
			console.log(res);
			console.log(res.data);
			setData([...data, res.data]);
			console.log(data);
		});
		setChecked(false);
		setTitleValue("");
	};
	const handleDelete = async (id) => {
		axios.delete("http://localhost:8000/" + id).then((res) => {
			console.log(res);
			console.log(res.data);

			const posts = task.filter((item) => item.id !== id);
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
	}, [data]);

	if (!task) return null;

	return (
		<div className="task-container">
			<div className="task-top-header">
				<div className="date-container">
					<h2>Thursday, 10th</h2>
					<p>
						<span>{task.length}</span> task
					</p>
					<button onClick={() => setShowForm(!showForm)}>+</button>
				</div>
				<br />
				<p>december</p>
			</div>
			<div className="task-bottom-container">
				{showForm && (
					<form onSubmit={handleSubmit}>
						<input
							checked={checked}
							onChange={(e) => setChecked(e.currentTarget.checked)}
							type="checkbox"
						/>
						<input
							value={titleValue}
							onChange={(e) => setTitleValue(e.target.value)}
							type="text"
						/>
						<button>submit</button>
					</form>
				)}

				{task.map((item, id) => {
					return (
						<div key={id} className="task-content-item">
							<div className="left-content">
								<input type="checkbox" defaultChecked={item.completed} />
								<p className={item.completed ? "checked" : "unchecked"}>
									{item.title}
								</p>
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