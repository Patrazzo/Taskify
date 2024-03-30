// InProgressColumn.jsx
import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task";
import axios from "axios";

export const InProgressColumn = ({ selectedList }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2608/getTask/${selectedList}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchTasks();
  }, [tasks]);

  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const column = "inprogress";
    const taskId = event.dataTransfer.getData("text/plain"); // Get the dragged task ID
    updateTaskStatus(taskId, column);
    console.log("Task dropped into In Progress column");
  };

  const updateTaskStatus = async (taskId, column) => {
    try {
      await axios.put(`http://localhost:2608/tasks/${taskId}/status`, { status: column });
      setTasks(tasks.map(task => task.taskid === taskId ? { ...task, status: column } : task));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  

  const handleTaskUpdate = async (taskId, updatedTitle, updatedDescription) => {
    try {
      await fetch(`http://localhost:2608/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });
      // Optionally, you can refresh the tasks after updating
      // Fetch tasks again or update the existing task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div
      className="w-[300px] p-0 rounded-3xl m-8 dashboard:m-2 mt-0 overflow-y-hidden min-h-[500px] z-30 dark:bg-[#068D9D] bg-[#3AB6C8] select-none"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-center items-center bg-taskify-lightDarkElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightBackground h-[60px] text-xl">
        <h4>IN PROGRESS</h4>
      </div>
      <div className="max-h-[440px] overflow-y-auto">
        {tasks
          .filter((task) => task.status === "inprogress")
          .map((task) => (
            <Task
              key={task.taskid}
              id={task.taskid}
              title={task.taskname}
              description={task.description}
              onUpdate={handleTaskUpdate} // Pass the onUpdate function
            />
          ))}
      </div>
    </div>
  );
};
