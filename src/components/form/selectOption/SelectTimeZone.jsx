import { Select } from "@windmill/react-ui";
import React from "react";

//internal import
import { timeZones } from "@/utils/timezones";

const SelectTimeZone = ({ register, name, label, required }) => {
  return (
    <Select
      name={name}
      {...register(`${name}`, {
        required: required ? `${label} is required!` : false,
      })}
    >
      <option value="" defaultValue hidden>
        Default Time Zone
      </option>
      {timeZones.map((timeZone, i) => (
        <option
          key={i + 1}
          value={timeZone.tzCode}
          className="py-12 hover:bg-white"
        >
          {timeZone.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectTimeZone;
