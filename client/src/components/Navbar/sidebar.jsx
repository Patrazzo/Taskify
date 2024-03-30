import React, { useState, useEffect } from "react";
import { ListTab } from "../List/listTab";
import { Link } from "react-router-dom";
import axios from "axios";
export const Sidebar = ({ user, setSelectedList }) => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleCreateNewList = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:2608/createList", {
      newListName: newListName,
      user: user,
    });
    setNewListName("");
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2608/getList/${user}`
        );
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
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
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={
          localStorage.getItem("theme") === "dark" ? "#f7f7f2" : "#17223b"
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
        onClick={() => setOpen(!open)}
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
        <ul className="flex justify-center flex-col space-y-2 font-medium pt-16">
          <li className="w-full flex items-center justify-center dark:bg-taskify-lightBlue">
            <div className="flex justify-center items-center flex-col w-full p-4">
              <input
                type="text"
                value={newListName}
                onChange={handleInputChange}
                placeholder="Enter list name"
                className="border-none bg-taskify-lightDarkElement dark:bg-taskify-DarkBlue dark:text-taskify-lightBackground rounded-md p-2 mb-2"
              />
              <button
                onClick={handleCreateNewList}
                className="dark:bg-taskify-DarkBlue dark:hover:bg-taskify-Green hover:bg-taskify-Green dark:hover:text-taskify-lightBlue bg-taskify-lightDarkElement dark:text-taskify-lightDarkElement text-taskify-lightBlue px-4 py-2 rounded-lg w-[200px]"
              >
                СЪЗДАЙ
              </button>
            </div>
          </li>
          {lists.map((list) => (
            <ListTab
              key={list.listid}
              listId={list.listid}
              listName={list.listname}
              onClick={handleListClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
