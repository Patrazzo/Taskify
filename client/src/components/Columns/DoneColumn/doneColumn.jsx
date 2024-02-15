import React, { useState, useEffect } from "react";
import "./CSS/doneColumn.css";
import { Task } from "../../Tasks/task";
import { DragDropContext } from 'react-beautiful-dnd';
export const DoneColumn = () => {
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
    <div className="custom-code select-none">
      <div className="name">
        <h4>DONE</h4>
      </div>
      <div className="tasks">
        {/* Map through the tasks array and create Task components for tasks with status "Done" */}
        {tasks
          .filter((task) => task.status === "done")
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
