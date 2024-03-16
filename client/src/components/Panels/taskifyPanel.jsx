import React from "react";
import { TodoColumn } from "../Columns/todoColumn";
import { InProgressColumn } from "../Columns/inProgressColumn";
import { DoneColumn } from "../Columns/doneColumn";
import { Button } from "../Button/button";
import Popup from "../Popup/popup";

export const TaskifyPanel = ({ buttonPopup, setButtonPopup }) => {
  return (
    <div className="p-4 m-3 flex flex-col items-center justify-center z-0">
      <Button setButtonPopup={setButtonPopup} name={"ДОБАВИ ЗАДАЧА"} />
      <div className="flex flex-row phone:flex-col">
        <TodoColumn></TodoColumn>
        <InProgressColumn></InProgressColumn>
        <DoneColumn></DoneColumn>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
};
