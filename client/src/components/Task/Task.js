import React, { useEffect, useState } from "react";
import axios from "axios";

import "./task.css";
function Task() {
	const [task, setTask] = useState([]);
	const [checked, setChecked] = useState(false);
	const [data, setData] = useState([]);
	const [titleValue, setTitleValue] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [updateId, setUpdateId] = useState(null);
	const [checkboxUpdate, setCheckBoxUpdate] = useState(false);
	const [inputUpdate, setInputUpdate] = useState("");
	const url = "http://localhost:8000/";
	const grayStyle = {
		color: "#A8A9CA",
	};
	//Display day and date
	var options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	var prnDt = new Date().toLocaleString("en-us", options);

	//
	const handleUpdate = (id) => {
		setUpdateId(id);
		const inputchecking = task.find((input) => input.id === id);
		console.log(inputchecking.completed, inputchecking.title);
		setCheckBoxUpdate(inputchecking.completed);
		setInputUpdate(inputchecking.title);
		setShowUpdateForm(true);
	};

	const handleupdateFinal = async (e) => {
		e.preventDefault();
		console.log("updateFinal");
		await updateFinal(checkboxUpdate, inputUpdate, updateId);
		setShowUpdateForm(false);
	};

	const updateFinal = async (x, y, id) => {
		await axios.patch(url + id, {
			title: y,
			completed: x,
		});

		const result = await axios.get(url);
		setTask(result.data);
	};
	//

	const createTask = async (e) => {
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
		setShowForm(false);
		setChecked(false);
		setTitleValue("");
	};
	//
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

	useEffect(() => {
		axios.get(url).then((response) => {
			// console.log(response.data);
			setTask(response.data);
		});
	}, [data]);

	if (!task) return null;

	return (
		<div className="task-container">
			<div className="task-top-header">
				<div className="date-container">
					<h2>{prnDt}</h2>
					<p style={grayStyle}>
						<span>{task.length}</span> task
					</p>
					<button onClick={() => setShowForm(!showForm)}>+</button>
				</div>
				<br />
				<p style={grayStyle}>December</p>
			</div>
			<div className="task-bottom-container">
				{showForm && (
					<form onSubmit={createTask}>
						<input
							style={{
								width: "100%",
								padding: ".5rem",
								border: "none",
								borderBottom: "2px solid #cccccc",
							}}
							value={titleValue}
							onChange={(e) => setTitleValue(e.target.value)}
							type="text"
							placeholder="Type your TASK..."
						/>
						<button>submit</button>
					</form>
				)}
				{showUpdateForm && (
					<form onSubmit={handleupdateFinal}>
						<input
							// checked={checkboxUpdate}
							type="checkbox"
							onChange={(e) => setCheckBoxUpdate(e.currentTarget.checked)}
							defaultChecked={checkboxUpdate}
						/>
						<input
							defaultValue={inputUpdate}
							type="text"
							onChange={(e) => setInputUpdate(e.target.value)}
						/>
						<div style={{ display: "flex", width: "100%" }}>
							<button style={{ width: "50%" }} type="submit">
								save
							</button>
							<button
								style={{ width: "50%" }}
								onClick={() => setShowUpdateForm(false)}
							>
								cancel
							</button>
						</div>
					</form>
				)}

				{task.map((item) => {
					return (
						<div className="task-content-item">
							<div className="left-content">
								{/* <input type="checkbox" defaultChecked={item.completed} /> */}
								<p className={item.completed ? "unchecked" : "checked"}>
									{item.title}
								</p>
							</div>
							<span>
								{new Date(item.createdAt).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
							<div style={{ display: "flex", gap: "1rem" }}>
								<button
									style={{ border: "none" }}
									onClick={() => handleUpdate(item.id)}
								>
									<img
										width={20}
										height={20}
										src="./assets/edit.svg"
										alt="edit"
									/>
								</button>
								<button
									style={{ border: "none" }}
									onClick={() => handleDelete(item.id)}
								>
									<img
										width={20}
										height={20}
										src="./assets/delete.svg"
										alt="delete"
									/>
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Task;
