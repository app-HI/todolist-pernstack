import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./task.css";
import CreateTask from "../CreateTask";
import RemoveTask from "../RemoveTask";
function Task() {
	const { user } = useAuthContext();
	const [task, setTask] = useState([]);
	const [checked, setChecked] = useState(false);
	// const [data, setData] = useState([]);
	const [titleValue, setTitleValue] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [updateId, setUpdateId] = useState(null);
	const [checkboxUpdate, setCheckBoxUpdate] = useState(false);
	const [inputUpdate, setInputUpdate] = useState("");
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
	var options2 = {
		month: "long",
	};
	var prnDt = new Date().toLocaleString("en-us", options);
	var month = new Date().toLocaleString("en-us", options2);

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
		await axios.patch(
			`${process.env.REACT_APP_ENDPOINT}/${id}`,
			{
				title: y,
				completed: x,
			},
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}
		);

		await fetchTodos();
		// setTask(result.data);
	};
	//
	const fetchTodos = useCallback(async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_ENDPOINT, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			setTask(response.data);
		} catch (error) {
			console.log(error);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			fetchTodos();
		}
	}, [fetchTodos, user]);

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
				<p style={grayStyle}>{month}</p>
			</div>
			<div className="task-bottom-container">
				{showForm && (
					<CreateTask
						showForm={showForm}
						setShowForm={setShowForm}
						setTasks={setTask}
						tasks={task}
						titleValue={titleValue}
						checked={checked}
						setTitleValue={setTitleValue}
						setChecked={setChecked}
					/>
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

				{task.map((item, id) => {
					return (
						<div key={id} className="task-content-item">
							<div className="left-content">
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
							<div style={{ display: "flex", gap: "2rem" }}>
								<button
									style={{ border: "none", width: "100%" }}
									onClick={() => handleUpdate(item.id)}
								>
									<img
										width={20}
										height={20}
										src="./assets/edit.svg"
										alt="edit"
									/>
								</button>

								<RemoveTask task={task} setTask={setTask} item={item} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Task;
