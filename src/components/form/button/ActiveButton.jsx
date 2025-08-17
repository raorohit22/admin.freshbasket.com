import React from "react";

const ActiveButton = ({ tapValue, activeValue, handleProductTap }) => {
  return (
    <button
      className={`inline-block px-4 py-2 text-base ${
        tapValue === activeValue &&
        "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 rounded-t-lg border-b-2"
      } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
    >
      {activeValue}
    </button>
  );
};

export default ActiveButton;
