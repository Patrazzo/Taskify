import React, { useState } from "react";
export const ListTab = ({ listId, listName, onClick }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(listName);
  const handleClick = () => {
    onClick(listId);
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  const submitEdit = async () => {
    setEditable(false);
    try {
      await fetch(`http://localhost:2608/lists/${listId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listName: name,
        }),
      });
    } catch (error) {
      console.error("Error updating list name:", error);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 textColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
            {editable ? (
              <input
                type="text"
                placeholder={listName}
                maxLength={20}
                className="w-5/6 h-6 ml-0 rounded-lg dark:bg-taskify-DarkBlue "
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span className="flex-1 ms-3 whitespace-nowrap">{listName}</span>
            )}
          </div>

          <div>
            {editable ? (
              <button onClick={submitEdit}>af</button>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 stroke-gray-500 hover:stroke-taskify-lightElement"
                onClick={handleEdit}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            )}
          </div>
        </div>
      </li>
    </>
  );
};
