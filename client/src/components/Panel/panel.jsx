import React, { useState } from "react";
import { TodoColumn } from "../Columns/TodoColumn/todoColumn";
import { InProgressColumn } from "../Columns/InProgressColumn/inProgressColumn";
import { DoneColumn } from "../Columns/DoneColumn/doneColumn";
import { Button } from "../Columns/Button/button";
import Popup from "../Popup/popup";

export const Panel = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div className="p-4 m-3 flex flex-col items-center justify-center z-0">
      <Button setButtonPopup={setButtonPopup} />
      <div className="flex flex-row phone:flex-col">
        <TodoColumn></TodoColumn>
        <InProgressColumn></InProgressColumn>
        <DoneColumn></DoneColumn>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </div>
  );
};
