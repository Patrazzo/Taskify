import React, { useState, useEffect } from "react";
import { ListTab } from "../../List/listTab";
import "../CSS/navbar.css";
function Sidebar() {
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
        retrieveLists(); // Fetch updated lists after creating a new one
        setNewListName(""); // Clear the input field
      } else {
        console.error("Failed to create new list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full sm:translate-x-0  color"
        aria-label="Sidebar"
      >
        <div className="h-full pb-4 overflow-y-auto color">
          <ul className="flex justify-center flex-col space-y-2 font-medium textColor">
            <li className="sticky top-0 w-full flex items-center justify-center">
              <div className="addDiv">
                <input
                  type="text"
                  value={newListName}
                  onChange={handleInputChange}
                  placeholder="Enter list name"
                  className="textInput"
                />
                <button onClick={handleCreateNewList} className="submitButton">
                  Create
                </button>
              </div>
            </li>
            {lists.map((list) => (
              <ListTab key={list.listid} listName={list.listname} /> // Assuming each list object has a 'name' property
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
