import React, { useState } from "react";
import axios from "axios";

export const Task = ({ id, title, description }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", id);
    event.target.style.opacity = "0.9";
  };

  const handleDragEnd = (event) => {
    event.target.style.opacity = "1";
  };

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpdate = (updatedTitle, updatedDescription) => {
    onUpdate(id, updatedTitle, updatedDescription);
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div
        draggable={`${isPopupOpen ? "false" : "true"}`}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`flex flex-col justify-center items-center bg-taskify-lightElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightDarkElement m-2 p-3 ${
          isPopupOpen ? "h-60" : "h-14"
        } rounded-2xl shadow cursor-pointer transition-all duration-200 overflow-y-hidden`}
      >
        <div className="w-full flex flex-row justify-between">
          <div className="taskData">
            <h1 className="text-md mb-1">{title}</h1>
            <p className="text-xs">{description}</p>
          </div>
          <div className="flex justify-center items-center">
            {isPopupOpen ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClosePopup}
              >
                <rect
                  x="40.3222"
                  y="-1"
                  width="10"
                  height="60"
                  rx="5"
                  transform="rotate(44.8594 40.3222 -2)"
                  fill="white"
                />
                <rect
                  x="47.0588"
                  y="42.225"
                  width="10"
                  height="60"
                  rx="5"
                  transform="rotate(137.269 47.0588 42.073)"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 stroke-gray-500 transition-colors duration-100 hover:stroke-taskify-lightElement"
                onClick={handleClick}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
            )}
          </div>
        </div>
        {isPopupOpen && (
          <Popup
            id={id}
            title={title}
            description={description}
            onClose={handleClosePopup}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

const Popup = ({ id, title, description, onClose, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:2608/tasks/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });
      onUpdate(updatedTitle, updatedDescription);
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
    onClose();
  };

  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2608/tasks/${id}`);
      onDelete(id);
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    onClose();
  };

  return (
    <div className="flex flex-col mt-5 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          maxLength={20}
          className="w-full rounded-lg dark:bg-taskify-DarkBlue "
        />
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          maxLength={45}
          className="w-full mt-1 rounded-lg dark:bg-taskify-DarkBlue resize-none"
        />
        <div className="flex flex-row w-full justify-between">
          <button
            className="flex justify-center items-center w-20 h-8 p-4 m-3 dark:bg-taskify-DarkBlue dark:hover:bg-taskify-Green rounded-full dark:hover:text-taskify-lightBlue"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="flex justify-center items-center w-20 h-8 p-4 m-3 dark:bg-taskify-DarkBlue dark:hover:bg-red-600 rounded-full dark:hover:text-taskify-lightBlue"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
