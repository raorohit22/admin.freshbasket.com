import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const AttributeOption = ({ id, attributes, values, setValues, resetRef }) => {
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [selectionLimit, setSelectionLimit] = useState(null);

  const { showingTranslateValue } = useUtilsFunction();

  const handleSelectValue = (v, el) => {
    // console.log("handleValue", v, el);
    if (el?.name === "All") {
      const result = attributes?.variants.filter((att) => att._id !== "1");

      setValues({
        ...values,
        [attributes._id]: result?.map((el) => el._id),
      });

      setSelectionLimit("1");
      // setAttributeOptions([el]);
    } else {
      setSelectionLimit(null);
      const dd = attributes?.variants.map((val) => {
        return {
          ...val,
          name: showingTranslateValue(val?.name),
        };
      });
      setAttributeOptions(dd);

      const exceptAllData = v.filter((el) => el._id !== "1");
      setValues({
        ...values,
        [attributes._id]: exceptAllData.map((el) => el._id),
      });
    }
  };

  const handleRemoveValue = (v, el, id) => {
    // console.log("handleRemoveValue", v, el);
    if (el._id === "1") {
      setSelectionLimit("1");
      let dd = attributes?.variants?.map((val) => {
        return {
          ...val,
          name: showingTranslateValue(val?.name),
        };
      });

      // console.log("dd", dd);

      setAttributeOptions([]);
      setAttributeOptions(dd);
    } else {
      setSelectionLimit(null);
      const exceptAllData = v.filter((el) => el._id !== "1");

      setValues({
        ...values,
        [attributes._id]: exceptAllData.map((el) => el._id),
      });
    }
  };

  useEffect(() => {
    const dd = attributes?.variants?.map((val) => {
      return {
        ...val,
        name: showingTranslateValue(val?.name),
      };
    });
    setAttributeOptions(dd);
  }, [attributes?.variants, setAttributeOptions]);

  return (
    <>
      <Multiselect
        key={id}
        displayValue="name"
        hidePlaceholder={true}
        options={attributeOptions}
        selectionLimit={selectionLimit}
        onSearch={function noRefCheck() {}}
        onKeyPressFn={function noRefCheck() {}}
        ref={(e) => (resetRef.current[id] = e)}
        onSelect={(v, el) => handleSelectValue(v, el)}
        onRemove={(v, el) => handleRemoveValue(v, el, id)}
        placeholder={showingTranslateValue(attributes.title)}
      ></Multiselect>
    </>
  );
};

export default AttributeOption;
