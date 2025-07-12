import { Select } from "@windmill/react-ui";

//internal import
import useAsync from "@/hooks/useAsync";
import CurrencyServices from "@/services/CurrencyServices";
// import { CODES } from 'currencies-map';

const SelectCurrency = ({
  register,
  name,
  label,
  required,
  // loading,
}) => {
  const { data, loading } = useAsync(CurrencyServices.getShowingCurrency);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Select
          name={name}
          {...register(`${name}`, {
            required: required ? `${label} is required!` : false,
          })}
        >
          {data?.map((currency) => (
            <option key={currency._id} value={`${currency.symbol}`}>
              {currency?.name}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};
export default SelectCurrency;
