import React from "react";
import "./task.css";

function Task() {
  return (
    <div className="task-container">
      <div className="task-top-header">
        <div className="date-container">
          <h2>thursday, 10th</h2>
          <p>
            <span>12</span>task
          </p>
          <button>+</button>
        </div>
        <br />
        <p>december</p>
      </div>
      <div className="task-bottom-container">
        <div className="task-content-item">
          <div className="left-content">
            <input type="checkbox" />
            <p>morning</p>
          </div>
          <p>5:00 AM</p>
        </div>
      </div>
    </div>
  );
}

export default Task;
