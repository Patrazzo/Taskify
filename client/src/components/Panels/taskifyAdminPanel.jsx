import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/button";
import axios from "axios";

export const TaskifyAdminPanel = () => {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [role, setRole] = useState("");
  const nav = useNavigate();
  const isDarkTheme = localStorage.getItem("theme") === "dark";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:2608/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [users]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch("http://localhost:2608/getAllLists");
        if (!response.ok) {
          throw new Error("Failed to fetch lists");
        }
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [lists]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:2608/getAllTasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

  useEffect(() => {
    const fetchDone = async () => {
      try {
        const response = await fetch("http://localhost:2608/getAllDone");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setDoneTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchDone();
  }, [doneTasks]);

  const handleDeleteUser = async (userId) => {
    console.log(userId);
    try {
      await axios.delete(`http://localhost:2608/userDelete/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      // Remove the deleted user from the state
      setUsers(users.filter((user) => user.userid !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Send a request to update the user's role
      await axios.put(`http://localhost:2608/updateUserRole/${userId}`, {
        role: newRole,
      });
      // Update the user's role in the state
      setUsers(
        users.map((user) =>
          user.userid === userId ? { ...user, role: newRole } : user
        )
      );
      setRole(newRole)
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2608/validate", {
          withCredentials: true,
        });
  
        if (response.data.Status === "Success") {
          setAuth(true);
          setRole(response.data.role); // Set role based on response
        } else {
          setAuth(false);
          setError(response.data.Error);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        console.error(error);
      }
    };
  
    fetchData();
  }, [auth, role]);


  return (
    <>
      {auth && role === "su" ? (
        <div
          className="w-full h-auto py-10
    bg-taskify-lightBackground dark:bg-taskify-DarkBlue
    flex justify-center items-center flex-col"
        >
          <Button
            redirect={true}
            pathToLocation={"/dashboard"}
            passFun={null}
            name={"ЗАДАЧИ"}
          />
          <h1 className="m-2 text-3xl text-taskify-textLightDarkColor dark:text-taskify-lightBackground">
            Статистики
          </h1>
          <div className="flex flex-row justify-center gap-10 w-full">
            <div className="w-72 h-72 bg-taskify-lightElement rounded-lg drop-shadow hover:drop-shadow-xl transition-all duration-300 dark:bg-taskify-lightBlue">
              <div className="p-10">
                <CircularProgressbar
                  value={users.length}
                  maxValue={10}
                  text={`${users.length}`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    trailColor: isDarkTheme ? "#101728" : "#e0e1dd", // Change trailColor based on theme
                    pathColor: isDarkTheme ? "#32ba7c" : "#20e3b2",
                    textSize: "20px",
                    textColor: isDarkTheme ? "#fffff2" : "#1e6091",
                  })}
                />
                <p className="text-center text-lg m-3 dark:text-taskify-lightBackground text-taskify-textLightDarkColor">
                  Потребители
                </p>
              </div>
            </div>
            <div className="w-72 h-72 bg-taskify-lightElement rounded-lg drop-shadow hover:drop-shadow-xl transition-all duration-300 dark:bg-taskify-lightBlue">
              <div className="p-10">
                <CircularProgressbar
                  value={lists.length}
                  maxValue={30}
                  text={`${lists.length}`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    trailColor: isDarkTheme ? "#101728" : "#e0e1dd", // Change trailColor based on theme
                    pathColor: isDarkTheme ? "#32ba7c" : "#20e3b2",
                    textSize: "20px",
                    textColor: isDarkTheme ? "#fffff2" : "#1e6091",
                  })}
                />
                <p className="text-center text-lg m-3 dark:text-taskify-lightBackground text-taskify-textLightDarkColor">
                  Листове
                </p>
              </div>
            </div>
            <div className="w-72 h-72 bg-taskify-lightElement rounded-lg drop-shadow hover:drop-shadow-xl transition-all duration-300 dark:bg-taskify-lightBlue">
              <div className="p-10">
                <CircularProgressbar
                  value={tasks.length}
                  maxValue={100}
                  text={`${tasks.length}`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    trailColor: isDarkTheme ? "#101728" : "#e0e1dd", // Change trailColor based on theme
                    pathColor: isDarkTheme ? "#32ba7c" : "#20e3b2",
                    textSize: "20px",
                    textColor: isDarkTheme ? "#fffff2" : "#1e6091",
                  })}
                />
                <p className="text-center text-lg m-3 dark:text-taskify-lightBackground text-taskify-textLightDarkColor">
                  Задачи
                </p>
              </div>
            </div>
            <div className="w-72 h-72 bg-taskify-lightElement rounded-lg drop-shadow hover:drop-shadow-xl transition-all duration-300 dark:bg-taskify-lightBlue">
              <div className="p-10">
                <CircularProgressbar
                  value={doneTasks.length}
                  maxValue={100}
                  text={`${doneTasks.length}`}
                  styles={buildStyles({
                    pathTransitionDuration: 3,
                    trailColor: isDarkTheme ? "#101728" : "#e0e1dd", // Change trailColor based on theme
                    pathColor: isDarkTheme ? "#32ba7c" : "#20e3b2",
                    textSize: "20px",
                    textColor: isDarkTheme ? "#fffff2" : "#1e6091",
                  })}
                />
                <p className="text-center text-lg m-3 dark:text-taskify-lightBackground text-taskify-textLightDarkColor">
                  Завършени задачи
                </p>
              </div>
            </div>
          </div>

          <div className="w-10/12 p-10 flex justify-center items-center flex-col">
            <h1 className="m-2 text-3xl text-taskify-textLightDarkColor dark:text-taskify-lightBackground">
              Потребители
            </h1>
            <div className="relative w-full overflow-x-auto drop-shadow rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Потребителско име
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Брой на листове
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Брой на задачите
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Роля
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Изтриване
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.userid}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 text-lg whitespace-nowrap dark:text-white"
                      >
                        {user.username}
                      </th>
                      <td className="px-6 py-4 text-lg">{user.num_lists}</td>
                      <td className="px-6 py-4 text-lg">{user.num_tasks}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.userid, e.target.value)
                          }
                          className="p-1 rounded-full h-7 dark:bg-gray-800 text-sm dark:border-gray-600 dark:text-white"
                        >
                          <option value="su">SUDO</option>
                          <option value="user">USER</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 justify-center flex flex-row">
                        <button
                          onClick={() => handleDeleteUser(user.userid)}
                          className="flex justify-center items-center w-20 h-8 p-4 mx-2 bg-taskify-lightDarkElement hover:bg-[#FF576F] hover:text-taskify-lightElement dark:bg-taskify-DarkBlue dark:hover:bg-red-600 rounded-full dark:hover:text-taskify-lightBlue"
                        >
                          Изтрий
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        nav("/dashboard")
      )}
    </>
  );
};
