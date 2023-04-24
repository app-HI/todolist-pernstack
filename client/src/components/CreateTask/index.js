import React from "react";
import axios from "axios";

const CreateTask = (props) => {
	const {
		titleValue,
		checked,
		setTitleValue,
		setChecked,
		url,
		tasks,
		setTasks,
		showForm,
		setShowForm,
	} = props;

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
			setTasks([...tasks, res.data]);
		});
		setChecked(false);
		setShowForm(!showForm);
		setTitleValue("");
	};

	return (
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
	);
};

export default CreateTask;
