import { Textarea } from "@windmill/react-ui";
import React from "react";

const TextAreaCom = ({
  register,
  name,
  label,
  placeholder,
  required,
  type,
  value,
}) => {
  return (
    <>
      <Textarea
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        rows="4"
        spellCheck="false"
      />
    </>
  );
};

export default TextAreaCom;
