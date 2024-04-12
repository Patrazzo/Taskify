import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task";
import axios from "axios";
import Cookies from "js-cookie";

export const TodoColumn = ({ selectedList }) => {
  const [tasks, setTasks] = useState([]);
  const [editingInProgress, setEditingInProgress] = useState(false); 

  useEffect(() => {
    Cookies.set("selectedList", selectedList);
  }, [selectedList]);

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
  }, [tasks, selectedList]);

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

  const handleTaskUpdate = (taskId, updatedTitle, updatedDescription) => {
    setTasks(
      tasks.map((task) =>
        task.taskid === taskId
          ? { ...task, taskname: updatedTitle, description: updatedDescription }
          : task
      )
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.taskid !== taskId));
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
              onUpdate={handleTaskUpdate}
              onDelete={handleTaskDelete}
              editingInProgress={editingInProgress}
              setEditingInProgress={setEditingInProgress}
            />
          ))}
      </div>
    </div>
  );
};
