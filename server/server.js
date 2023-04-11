const express = require("express");
const app = express();

// define all endpoints

app.get("/", (req, res) => {
	console.log("success");
	res.json("you are using get method te get data!");
});
app.get("/id", (req, res) => {
	console.log("success");
});
app.post("/", (req, res) => {
	console.log("success");
});
app.put("/", (req, res) => {
	console.log("success");
});
app.delete("/", (req, res) => {
	console.log("success");
});

//
const port = 8000;
app.listen(port, (req, res) => {
	console.log("connected");
});
