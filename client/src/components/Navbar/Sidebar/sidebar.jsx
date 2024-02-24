import React, { useState, useEffect } from "react";
import { ListTab } from "../../List/listTab";

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
  }, []);

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
        // Fetch updated lists after creating a new one
        setNewListName(""); // Clear the input field
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

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-500 z-40 transition-opacity duration-300 ${
          open ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 ${
          open ? "left-0" : "-left-full"
        } w-72 h-full bg-gray-200 z-50 transition-all duration-300 overflow-y-auto`}
      >
        <ul className="flex justify-center flex-col space-y-2 font-medium">
          <li className="sticky top-0 w-full flex items-center justify-center bg-gray-100">
            <div className="flex justify-center items-center flex-col w-full p-4">
              <input
                type="text"
                value={newListName}
                onChange={handleInputChange}
                placeholder="Enter list name"
                className="border border-gray-300 rounded-md p-2 mb-2"
              />
              <button
                onClick={handleCreateNewList}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </li>
          {lists.map((list) => (
            <ListTab key={list.listid} listName={list.listname} />
          ))}
        </ul>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`fixed h-7 bg-gray-100 cursor-pointer z-50 w-7 ${
          !open && "rotate-180"
        } ${open ? "left-50" : "left-0"}`}
        onClick={() => setOpen(!open)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </>
  );
};
