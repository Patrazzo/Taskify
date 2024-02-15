import React, { useState, useEffect } from "react";
import "./CSS/todoColumn.css";
import { Task } from "../../Tasks/task";

export const TodoColumn = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2608/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [tasks]); // Add tasks as dependency so useEffect reruns when tasks state changes

  return (
    <div className="todoColumn select-none test">
      <div className="name">
        <h4>TODO</h4>
      </div>
      <div className="tasks">
        {tasks
          .filter((task) => task.status === "todo")
          .map((task) => (
            <Task
              key={task.taskid}
              id={task.id}
              title={task.taskname}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};
