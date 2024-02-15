import React from "react";

export const Info = (props) => {
  const flexRowReverse = props.reverse ? "flex-row-reverse" : "flex-row";
  const flexColReverse = props.reverse ? "flex-col-reverse" : "flex-col";
  return (
    <div
      className={`flex ${flexRowReverse} phone:flex-col justify-between h-75vh phone:h-auto phone:pb-10 phone:items-center dark:bg-taskify-DarkBlue taskify-lightBackground`}
    >
      <div className="w-2/4 phone:w-full flex taskify-White-text justify-center items-center">
        <img src={props.imgSrc} alt="image" className="logo" />
      </div>
      <div className="w-2/4 phone:w-full smallphone:w-full smallphone:text-xs smallphone:px-1 smallphone:h-auto flex justify-center items-center flex-col p-5">
        <h1 className="text-4xl taskify-Green-text text-center mb-10">
          {props.heading}
        </h1>
        <p className="text-xl max-w-xl smallphone:text-base dark:text-taskify-lightElement taskify-lightBlue-text smallphone:max-w-none text-center">
          {props.description}
        </p>
      </div>
    </div>
  );
};
