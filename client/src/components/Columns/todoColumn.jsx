import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task";

export const TodoColumn = () => {
  const [tasks, setTasks] = useState([]);
  let selectedList = localStorage.getItem("selectedListId");

  useEffect(() => {
    fetch(`http://localhost:2608/tasks?listId=${selectedList}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [tasks]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const column = "todo";
    const taskId = event.dataTransfer.getData("text/plain");
    updateTaskStatus(taskId, column);
  };

  const updateTaskStatus = async (taskId, column) => {
    try {
      await fetch(`http://localhost:2608/tasks/${taskId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: column }),
      });
      // Refresh tasks after updating
      const updatedTasks = tasks.map((task) =>
        task.taskid === taskId ? { ...task, status: column } : task
      );
      setTasks(updatedTasks);
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
      className="w-[300px] p-0 rounded-3xl min-h-[500px] m-8 dashboard:m-2 mt-0 overflow-y-hidden z-30 dark:bg-[#C1121F] bg-[#FF576F] select-none"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-center items-center bg-taskify-lightDarkElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightElement h-[60px] text-xl">
        <h4>TODO</h4>
      </div>
      <div className="max-h-[440px] overflow-y-auto">
        {tasks
          .filter((task) => task.status === "todo")
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