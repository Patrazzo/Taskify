import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export const TypedWords = (props) => {
  const [text] = useTypewriter({
    words: props.words,
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 20,
  });
  return (
    <>
      <div className="dark:bg-[#06beb6] bg-[#20e3b2]">
        <div className="w-full h-56 rounded-b-full flex flex-col justify-center items-center
        dark:bg-taskify-DarkBlue text-taskify-Green text-5xl bg-taskify-lightBackground">
          <div>
            <span className="drop-shadow">{text}</span>
            <Cursor cursorStyle="|" />
          </div>
        </div>
      </div>
    </>
  );
};
