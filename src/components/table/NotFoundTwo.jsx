import React from "react";

const NotFoundTwo = ({ title }) => {
  return (
    <div className="flex justify-center item h-full items-center">
      <h2 className="text-lg md:text-xl text-center mt-2 font-medium font-serif text-gray-600">
        {title}
        <span role="img" aria-labelledby="img">
          😞
        </span>
      </h2>
    </div>
  );
};

export default NotFoundTwo;
