import React, { useState } from "react";

export const Task = ({ id, title, description, onUpdate }) => {
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
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        className="flex flex-row justify-between items-center bg-taskify-lightElement text-taskify-textLightDarkColor dark:bg-taskify-lightBlue dark:text-taskify-lightDarkElement m-2 p-3 rounded-2xl h-14 shadow cursor-pointer" // Added cursor-pointer to show it's clickable
      >
        <div className="taskData">
          <h1 className="text-md mb-1">{title}</h1>
          <p className="text-xs">{description}</p>
        </div>
        <div className="taskSettings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
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
  );
};

const Popup = ({ id, title, description, onClose, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      // Make an HTTP request to update the task
      await fetch(`http://localhost:2608/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      // Notify the parent component that the task has been updated
      onUpdate(updatedTitle, updatedDescription);
      onClose(); // Close the popup after updating
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error if needed
    }
  };

  const handleDelete = async () => {
    try {
      // Make an HTTP request to delete the task
      await fetch(`http://localhost:2608/tasks/${id}`, {
        method: "DELETE",
      });

      onClose(); // Close the popup after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Update Task</h2>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
