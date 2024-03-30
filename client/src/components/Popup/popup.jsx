import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function Popup({ trigger, setTrigger, selectedList }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const popupRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post("http://localhost:2608/addTask", {
      newName: name,
      newDescription: description,
      listId: selectedList,
    });
    setName("");
    setDescription("");
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
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full h-full opacity-50 dark:bg-taskify-lightBlue bg-taskify-lightElement z-30 animate-fade-in-background " />
      <div
        ref={popupRef}
        className="bg-taskify-lightDarkElement dark:bg-taskify-lightBlue rounded-xl w-96 h-96 p-6 z-30 flex flex-col items-center shadow-lg transition duration-300 animate-fade-in-out"
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
              value={description}
              onChange={handleDescriptionChange}
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

      <style jsx>{`
        @keyframes fade-in-out {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-out {
          animation: fade-in-out 0.3s ease-in-out;
        }

        @keyframes animate-fade-in-background {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }
        .animate-fade-in-background {
          animation: animate-fade-in-background 0.3s ease-in-out;
        }
      `}</style>
    </div>
  ) : (
    ""
  );
}

export default Popup;