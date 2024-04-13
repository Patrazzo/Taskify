import React from 'react';

const ErrorMessagePopup = ({showError, setShowError}) => {
  

  return (
    <div  onClick={() => setShowError(false)} className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      {showError && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-red-600 font-bold mb-4">Error</h2>
          <p>Няма избран лист!</p>
          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
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
