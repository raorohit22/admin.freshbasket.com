import { Select } from "@windmill/react-ui";

const SelectReceiptSize = ({
  setPosCustomer,
  register,
  name,
  label,
  pos,
  required,
}) => {
  return (
    <>
      <Select
        onChange={(e) => setPosCustomer(e.target.value)}
        className={`${pos ? "h-10" : "h-12"}`}
        name={name}
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
        })}
      >
        {/* <option value="" defaultValue hidden>
            Default POS Customer 
        </option> */}
        <option value="57-mm" defaultValue>
          57 mm
        </option>
        <option value="80-mm">80 mm</option>
        <option value="3-1/8">3 1/8"</option>
        <option value="2-1/4">2 1/4"</option>
        <option value="A4">A4</option>
      </Select>
    </>
  );
};

export default SelectReceiptSize;
