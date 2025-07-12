import { Input } from "@windmill/react-ui";
import React from "react";

const SkuBarcodeInput = ({
  id,
  value,
  name,
  placeholder,
  handleSkuBarcode,
}) => {
  return (
    <>
      <Input
        onBlur={(e) => handleSkuBarcode(e.target.value, name, id)}
        defaultValue={value}
        type="text"
        name={name}
        placeholder={placeholder}
        className={`mx-1 h-8 w-18 md:w-20 lg:w-20 p-2`}
      />
    </>
  );
};

export default SkuBarcodeInput;
