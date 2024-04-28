import React, { useState, useEffect } from "react";
import { ListTab } from "../List/listTab";
import { Link } from "react-router-dom";
import axios from "axios";

export const Sidebar = ({
  user,
  setSelectedList,
  selectedList,
  name,
  setName,
}) => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [editingInProgress, setEditingInProgress] = useState(false);
  const [showError, setShowError] = useState("");
  const [isEditing, setIsEditing] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleCreateNewList = async (event) => {
    event.preventDefault();
  
    if (newListName.trim() === "") {
      setShowError("Името трябва да съдържа поне 1 символ");
    } else {
      try {
        await axios.post("http://localhost:2608/createList", {
          newListName: newListName,
          user: user,
        });
        fetchLists();
        setNewListName("");
        setShowError(false);
      } catch (error) {
        console.error("Error creating list:", error);
      }
    }
  };


  const updateCredentials = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2608/updateCredentials",
        {
          username: username,
          password: password,
          user: user,
        }
      );
      console.log("Credentials updated:", response.data);
      setShowError(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error updating credentials:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setShowError(error.response.data.error);
      } else {
        setShowError("An error occurred while updating credentials");
      }
    }
  };
  

  const fetchLists = async () => {
    try {
      const response = await axios.get(`http://localhost:2608/getList/${user}`);
      const fetchedLists = response.data.map((list, index) => ({
        ...list,
        index,
      }));
      if (selectedList === "default" && fetchedLists.length > 0) {
        setSelectedList(fetchedLists[0].listid);
      }
      setLists(fetchedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [lists]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const handleListClick = (listId) => {
    setSelectedList(listId);
    setEditingInProgress(false);
    setShowError(false);
  };

  const handleListDelete = (deletedListId) => {
    setLists((prevLists) =>
      prevLists.filter((list) => list.listid !== deletedListId)
    );
    setSelectedList("default");
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={
          localStorage.getItem("theme") === "dark" ? "#f7f7f2" : "#1e6091"
        }
        className={`absolute m-2 cursor-pointer h-7 w-7 z-30 ${
          open
            ? "left-72 transition-all duration-300"
            : "left-0 transition-all duration-300"
        }`}
        onClick={() => setOpen(!open)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>

      <div
        className={`fixed top-0 left-0 w-full h-full dark:bg-taskify-lightBlue bg-taskify-lightElement z-20 transition-opacity duration-300 ${
          open ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setOpen(!open), setShowError(false), setIsEditing(false);
        }}
      />
      <div
        className={`fixed top-0 ${
          open ? "left-0" : "-left-full"
        } w-72 h-full dark:bg-taskify-lightBlue bg-taskify-lightElement z-30 transition-all duration-300 overflow-y-auto`}
      >
        <Link
          to="/home"
          className="fixed top-0 dark:bg-taskify-lightBlue bg-taskify-lightElement w-72"
        >
          <div className="flex flex-row items-center gap-2 m-4 ml-8">
            <img src="/assets/logo.svg" alt="Logo" height={30} width={30} />
            <h1 className="text-2xl dark:text-white text-taskify-lightBlue">
              Taskify
            </h1>
          </div>
        </Link>
        <ul className="flex flex-col space-y-2 h-full font-medium pt-16">
          <li className="w-full flex items-center justify-center dark:bg-taskify-lightBlue">
            <div className="flex justify-center items-center flex-col w-full p-4">
              <input
                type="text"
                value={newListName}
                onChange={handleInputChange}
                placeholder="Въведи име на лист"
                className="border-none bg-taskify-lightDarkElement dark:bg-taskify-DarkBlue dark:text-taskify-lightBackground text-taskify-textLightDarkColor rounded-md p-2"
              />
              {showError ? (
                <p className="text-xs text-center text-[#FF576F]">
                  {showError}
                </p>
              ) : null}
              <button
                onClick={handleCreateNewList}
                className="dark:bg-taskify-DarkBlue hover:text-taskify-lightBackground dark:hover:bg-taskify-Green hover:bg-taskify-Green dark:hover:text-taskify-lightBlue bg-taskify-lightDarkElement dark:text-taskify-lightDarkElement text-taskify-textLightDarkColor px-4 mt-2 py-2 rounded-lg w-[200px]"
              >
                СЪЗДАЙ
              </button>
            </div>
          </li>
          <div className="max-h-[73%] overflow-y-auto">
            {lists.map((list) => (
              <ListTab
                key={list.listid}
                listId={list.listid}
                listName={list.listname}
                onClick={handleListClick}
                onDelete={handleListDelete}
                editingInProgress={editingInProgress}
                setEditingInProgress={setEditingInProgress}
                setShowError={setShowError}
                isSelected={selectedList === list.listid} // Check if the list is selected
              />
            ))}
          </div>
          {isEditing ? (
            <div>
              <div className="fixed bottom-5 phone:bottom-20 left-80 phone:left-10 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <div
                  className="w-full px-4 py-2 text-base text-center rounded-t-lg
                  text-taskify-textLightDarkColor bg-taskify-lightDarkElement 
                  dark:text-taskify-lightBackground dark:bg-taskify-lightBlue
                  "
                >
                  Промяна на данни
                </div>

                <form>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ново име"
                    className="border-none w-full bg-taskify-lightElement dark:bg-taskify-DarkBlue dark:text-taskify-lightBackground text-taskify-textLightDarkColor p-2"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Нова парола"
                    className="border-none w-full bg-taskify-lightElement dark:bg-taskify-DarkBlue dark:text-taskify-lightBackground text-taskify-textLightDarkColor p-2"
                  />
                  <button
                    onClick={updateCredentials}
                    className="w-full p-2 font-medium text-center bg-taskify-lightDarkElement dark:bg-taskify-lightBlue hover:bg-[#20e3b2] dark:hover:bg-taskify-Green rounded-b-lg text-taskify-textLightDarkColor dark:text-taskify-lightBackground cursor-pointer"
                  >
                    ПОТВЪРДИ
                  </button>
                </form>
              </div>
            </div>
          ) : null}
          <div
            className={`fixed bottom-0 transition-all duration-300 ${
              open ? "left-0" : "-left-full"
            } w-72 h-14 flex items-center justify-between p-10 dark:bg-taskify-lightBlue`}
          >
            <p className="dark:text-taskify-lightBackground text-lg text-taskify-textLightDarkColor">
              {name}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke={
                localStorage.getItem("theme") === "dark" ? "#f7f7f2" : "#1e6091"
              }
              className="w-6 h-6 hover:rotate-45 transition-all duration-100 dark:bg-taskify-lightBlue"
              onClick={
                isEditing ? () => setIsEditing(false) : () => setIsEditing(true)
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </ul>
      </div>
    </>
  );
};
