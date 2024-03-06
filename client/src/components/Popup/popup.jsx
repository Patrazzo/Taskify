import React, { useState, useEffect, useRef } from "react";

function Popup({ trigger, setTrigger }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  let selectedList = localStorage.getItem("selectedListId");
  const popupRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2608/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId: selectedList,
          taskName: name,
          taskDescription: message,
        }), // Pass listId here
      });

      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the input fields
    setName("");
    setMessage("");

    setTrigger(false); // Close the popup after submission
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setTrigger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setTrigger]);

  return trigger ? (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-25 main-color-blur flex justify-center items-center z-50 backdrop-blur">
      <div
        ref={popupRef}
        className="bg-taskify-lightDarkElement dark:bg-taskify-lightBlue rounded-xl w-96 h-96 p-6 z-60 flex flex-col items-center shadow-lg transition duration-300 transform"
      >
        <div className="w-full h-6 text-base z-70 flex items-center justify-end">
          <svg
            width="15"
            height="15"
            viewBox="0 0 46 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setTrigger(false)}
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
        </div>

        <div className="flex items-center justify-center flex-col">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              className="mt-6 rounded-lg w-72 resize-none bg-taskify-lightBackground dark:bg-taskify-DarkBlue text-white border-spacing-0"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Заглавие"
              required
            />
            <textarea
              className="mt-6 rounded-lg resize-none main-color bg-taskify-lightBackground dark:bg-taskify-DarkBlue text-white !important custom"
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              rows="4"
              placeholder="Описание"
            ></textarea>
            <button
              type="submit"
              className="main-color dark:bg-taskify-DarkBlue dark:hover:bg-taskify-Green dark:hover:text-taskify-DarkBlue bg-taskify-lightBackground hover:bg-taskify-Green text-taskify-DarkBlue hover:text-taskify-lightElement dark:text-white py-2 px-4 rounded-lg cursor-pointer text-base m-6 transition duration-1000"
            >
              Създай
            </button>
          </form>
        </div>

      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
