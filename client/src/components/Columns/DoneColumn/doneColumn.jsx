import React, { useState, useEffect } from "react";
import { Task } from "../Tasks/task";
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
    <div className="w-[300px] p-0 rounded-3xl m-8 mt-0 overflow-y-hidden min-h-[500px] z-30 dark:bg-[#3BC14A] bg-[#6DD871] select-none">
      <div className="flex justify-center items-center bg-taskify-lightDarkElement text-taskify-DarkBlue dark:bg-taskify-lightBlue dark:text-taskify-lightBackground h-[60px] text-xl">
        <h4>DONE</h4>
      </div>
      <div className="max-h-[440px] overflow-y-auto">
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
