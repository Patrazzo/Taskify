import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task.jsx";

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
    <div className="w-[300px] p-0 rounded-3xl m-8 mt-0 overflow-y-hidden z-30 dark:bg-[#C1121F] bg-[#FF576F] select-none">
      <div className="flex justify-center items-center bg-taskify-lightDarkElement text-taskify-DarkBlue dark:bg-taskify-lightBlue dark:text-taskify-lightElement h-[60px] text-xl">
        <h4>TODO</h4>
      </div>
      <div className="max-h-[440px] overflow-y-auto">
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
