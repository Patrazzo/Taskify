import React, { useState } from "react";
import axios from "axios";

export const ListTab = ({
  listId,
  listName,
  onClick,
  onDelete,
  editingInProgress,
  setEditingInProgress,
  setShowError,
  showError,
}) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(listName);

  const handleClick = () => {
    onClick(listId);
  };

  const handleEdit = () => {
    if (!editingInProgress) {
      setEditable(true);
      setEditingInProgress(true);
    }
  };

  const submitEdit = async () => {
    if (name === "") {
      setName(listName);
    } else if (name.trim() === "") {
      setShowError(true);
    } else {
      setEditable(false);
      setEditingInProgress(false);
      setShowError(false)
      try {
        await axios.put(`http://localhost:2608/lists/${listId}`, {
          listName: name,
        });
      } catch (error) {
        console.error("Error updating list name:", error);
      }
    }
  };

  const submitDelete = async () => {
    setEditable(false);
    setEditingInProgress(false);
    try {
      await axios.delete(`http://localhost:2608/lists/${listId}`);
      onDelete(listId);
    } catch (error) {
      console.error("Error deleting list :", error);
    }
  };

  return (
    <>
      <li className="mx-4">
        <div className="flex p-2 flex-row items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <div
            onClick={handleClick}
            className="flex items-center w-11/12 text-gray-900 dark:text-white  "
          >
            {editable ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#C1121F"
                className="w-6 h-6"
                onClick={submitDelete}
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 stroke-gray-500 h-6 textColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>
            )}

            {editable ? (
              <input
                type="text"
                placeholder={listName}
                maxLength={20}
                className="w-5/6 h-6 rounded-lg dark:bg-taskify-DarkBlue ml-1"
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span className="flex-1 ms-3 text-taskify-textLightDarkColor dark:text-taskify-lightBackground whitespace-nowrap">{listName}</span>
            )}
          </div>

          <div className="flex justify-center items-center">
            {editable ? (
              <button onClick={submitEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#32ba7c"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <button disabled={editingInProgress}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 stroke-gray-500 hover:stroke-taskify-textLightDarkColor"
                  onClick={handleEdit}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </li>
    </>
  );
};
