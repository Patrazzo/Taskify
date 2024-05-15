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
  isSelected,
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
      setShowError("Името трябва да съдържа поне 1 символ");
    } else {
      setEditable(false);
      setEditingInProgress(false);
      setShowError(false);
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
        <div
          className={`flex p-2 flex-row items-center justify-between ${
            isSelected
              ? "bg-taskify-lightDarkElement dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-lg`}
        >
          <div
            onClick={handleClick}
            className="flex items-center w-11/12 text-gray-900 dark:text-white"
          >
            {editable ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#C1121F"
                className="w-5 h-5"
                fill="none"
                onClick={submitDelete}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
              <span className="flex-1 ms-3 text-taskify-textLightDarkColor dark:text-taskify-lightBackground whitespace-nowrap">
                {listName}
              </span>
            )}
          </div>

          <div className="flex justify-center items-center">
            {editable ? (
              <button onClick={submitEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#32ba7c"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
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
