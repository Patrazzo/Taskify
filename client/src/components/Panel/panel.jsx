import React, { useState } from 'react';
import { TodoColumn } from '../Columns/TodoColumn/todoColumn';
import { InProgressColumn } from '../Columns/InProgressColumn/inProgressColumn';
import { DoneColumn } from '../Columns/DoneColumn/doneColumn';
import { Button } from '../Columns/Button/button';
import Popup from '../Popup/popup';


export const Panel = () => {
  const [buttonPopup, setButtonPopup] = useState(false)
  return (
    
    <div>
      <div className="p-4 sm:ml-64 ">
        <div className="p-4 mt-14 flex flex-col items-center ">
          <Button setButtonPopup={setButtonPopup}/>
          <div className="flex flex-row ">
            <TodoColumn></TodoColumn>
            <InProgressColumn></InProgressColumn>
            <DoneColumn></DoneColumn>
          </div>
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}/>
    </div>
  );
};
