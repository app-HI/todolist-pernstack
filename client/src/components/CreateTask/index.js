import React, { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreateTask = (props) => {
	const { user } = useAuthContext();
	const {
		titleValue,
		checked,
		setTitleValue,
		setChecked,
		tasks,
		setTasks,
		showForm,
		setShowForm,
	} = props;
	useEffect(() => {
		console.log("created");
	}, [tasks]);
	const createTask = async (e) => {
		if (!user) {
			return;
		}
		e.preventDefault();
		const itemsValue = {
			title: titleValue,
			completed: checked,
		};
		console.log(itemsValue);
		await axios
			.post("http://localhost:8000/task", itemsValue, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then((res) => {
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
