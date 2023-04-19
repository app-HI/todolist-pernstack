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

	//
	const [checkboxUpdate, setCheckBoxUpdate] = useState(false);
	const [inputUpdate, setInputUpdate] = useState("");
	//
	const url = "http://localhost:8000/";
	//
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
					<form onSubmit={createTask}>
						{/* <input
							checked={checked}
							onChange={(e) => setChecked(e.currentTarget.checked)}
							type="checkbox"
						/> */}

						<input
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
						<button type="submit">save</button>
					</form>
				)}

				{task.map((item, id) => {
					return (
						<div key={id} className="task-content-item">
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
							<div>
								{/* <button onClick={() => handleUpdate(item.id)}>update</button> */}
								<button onClick={() => handleUpdate(item.id)}>Edit</button>
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
