// DoneColumn.jsx
import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task";
import axios from "axios";

export const DoneColumn = ({ selectedList, userId }) => {
  const [tasks, setTasks] = useState([]);
  const [editingInProgress, setEditingInProgress] = useState(false); 
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2608/getTask/${selectedList}?userId=${userId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchTasks();
  }, [selectedList, tasks]);

  const handleDragOver = (event) => {
    event.preventDefault(); 
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const column = "done";
    const taskId = event.dataTransfer.getData("text/plain"); 
    updateTaskStatus(taskId, column);
  };

  const updateTaskStatus = async (taskId, column) => {
    try {
      await axios.put(`http://localhost:2608/tasks/${taskId}/status`, {
        status: column,
      });
      setTasks(
        tasks.map((task) =>
          task.taskid === taskId ? { ...task, status: column } : task
        )
      );
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
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  return (
    <div
      className="w-[300px] p-0 rounded-3xl m-8 dashboard:m-2 mt-0 overflow-y-hidden min-h-[500px] z-30 
      dark:bg-[#3BC14A] bg-[#6DD871] select-none"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-center items-center h-[60px] text-xl 
      bg-taskify-lightDarkElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightBackground 
      ">
        <h4>ЗАВЪРШЕНИ</h4>
      </div>
      <div className="max-h-[440px] overflow-y-auto">
        {tasks
          .filter((task) => task.status === "done")
          .map((task) => (
            <Task
              key={task.taskid}
              id={task.taskid}
              title={task.taskname}
              description={task.description}
              onUpdate={handleTaskUpdate} 
              editingInProgress={editingInProgress}
              setEditingInProgress={setEditingInProgress}
            />
          ))}
      </div>
    </div>
  );
};
