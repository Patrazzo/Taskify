import React from "react";

export const Quote = ({quote, author, who, image}) => {
  return (
    <>
      <div className="w-full bg-taskify-lightBackground dark:bg-taskify-DarkBlue py-10">
        <figure className="phone:w-5/6 w-8/12 mx-auto text-center bg-taskify-lightBackground dark:bg-taskify-DarkBlue">
          <svg
            className="w-10 h-10 mx-auto mb-3 text-taskify-Green drop-shadow"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-taskify-lightBlue dark:text-white">
              {quote}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 ">
            <img
              className="w-6 h-6 rounded-full m-2"
              src={`${image}`}
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pr-3 font-medium text-taskify-lightBlue dark:text-taskify-lightElement">
                {author}
              </cite>
              <cite className="pl-3 text-sm dark:text-taskify-lightDarkElement text-gray-600 ">
                {who}
              </cite>
            </div>
          </figcaption>
        </figure>
      </div>
    </>
  );
};
