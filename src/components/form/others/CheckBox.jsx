import React from 'react';

const CheckBox = ({ id, name, type, handleClick, isChecked }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
    </>
  );
};

export default CheckBox;
