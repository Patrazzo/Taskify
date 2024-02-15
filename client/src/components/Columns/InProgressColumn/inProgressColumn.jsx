import React, { useState, useEffect } from "react";
import "./CSS/inProgressColumn.css";
import { Task } from "../../Tasks/task";

export const InProgressColumn = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch("http://localhost:2608/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [tasks]);

  return (
    <div className="inprogressColumn select-none">
      <div className="name">
        <h4>IN PROGRESS</h4>
      </div>
      <div className="tasks">
        {tasks
          .filter((task) => task.status === "inprogress")
          .map((task) => (
            <Task
              key={task.taskid}
              title={task.taskname}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};
