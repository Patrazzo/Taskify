import React from 'react';

const ErrorMessagePopup = ({showError, setShowError}) => {
  

  return (
    <div  onClick={() => setShowError(false)} className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      {showError && (
        <div className="bg-taskify-lightDarkElement dark:bg-taskify-lightBlue rounded-lg shadow-lg p-8">
          <h2 className="text-red-600 font-bold ">Грешка</h2>
          <p className='m-4 dark:text-taskify-lightBackground text-taskify-DarkBlue'>Няма избран лист!</p>
          <button
            className="dark:bg-taskify-DarkBlue hover:text-taskify-lightBackground dark:hover:bg-taskify-Green hover:bg-taskify-Green dark:hover:text-taskify-lightBlue bg-taskify-lightElement dark:text-taskify-lightDarkElement text-taskify-textLightDarkColor px-4 mt-2 py-2 rounded-lg w-[200px]"
            onClick={() => setShowError(false)}
          >
            Close
          </button>
        </div>
      )}
      
    </div>
  );
};

export default ErrorMessagePopup;
