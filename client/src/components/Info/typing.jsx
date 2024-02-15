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
    <div className="w-full h-48 taskify-DarkBlue flex flex-col justify-center items-center taskify-Green-text text-5xl">
      <div>
        <span>{text}</span>
        <Cursor cursorStyle="|" />
      </div>
    </div>
  );
};
