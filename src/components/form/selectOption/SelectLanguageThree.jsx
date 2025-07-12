import { Select } from "@windmill/react-ui";
import { useEffect } from "react";

//internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";

const SelectLanguageThree = ({
  register,
  name,
  label,
  required,
  setValue,
  watch,
}) => {
  const { languages } = useUtilsFunction();
  const selectedLanguage = watch(name); // Get the current value of the field

  useEffect(() => {
    if (!selectedLanguage && languages?.length) {
      // Set default value if none exists
      setValue(name, languages[0]?.iso_code);
    }
  }, [languages, selectedLanguage, name, setValue]);

  return (
    <>
      <Select
        name={name}
        value={selectedLanguage || ""}
        {...register(name, {
          required: required ? false : `${label} is required!`,
        })}
        onChange={(e) => {
          setValue(name, e.target.value); // Update the value in React Hook Form
        }}
      >
        <option value="" hidden>
          Select Language
        </option>

        {languages?.map((language, i) => (
          <option key={i + 1} value={language.iso_code}>
            {language.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectLanguageThree;
