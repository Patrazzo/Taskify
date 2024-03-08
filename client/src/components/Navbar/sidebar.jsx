import React, { useState, useEffect } from "react";
import { ListTab } from "../List/listTab";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    fetch("http://localhost:2608/lists")
      .then((response) => response.json())
      .then((data) => {
        setLists(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [lists]);

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleCreateNewList = async () => {
    try {
      const response = await fetch("http://localhost:2608/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName: newListName }),
      });

      if (response.ok) {
        console.log("New list created successfully");
        setNewListName("");
      } else {
        console.error("Failed to create new list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const handleListClick = (listId) => {
    localStorage.setItem("selectedListId", listId);
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
        className={`absolute cursor-pointer h-7 w-7 z-30 ${
          open
            ? "left-72 transition-all duration-300"
            : "left-0 transition-all duration-300"
        }
        ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
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
                className="dark:bg-taskify-DarkBlue dark:hover:bg-taskify-Green hover:bg-taskify-Green dark:hover:text-taskify-lightBlue bg-taskify-lightDarkElement dark:text-white text-taskify-lightBlue px-4 py-2 rounded-lg w-[200px]"
              >
                Create
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
