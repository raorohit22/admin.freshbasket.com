import React, { useEffect, useState } from "react";

//internal import
import useAsync from "@/hooks/useAsync";
import CategoryServices from "@/services/CategoryServices";

const ChildrenCategory = ({ value }) => {
  const [categories, setCategories] = useState([]);

  const { data } = useAsync(CategoryServices.getAllCategory);
  // console.log('data',data)
  useEffect(() => {
    if (value) {
      const result = data.filter((parent) =>
        parent.parentName.toLowerCase().includes(value.toLowerCase())
      );
      setCategories(result);
    } else {
      setCategories(data);
    }
  }, [data, value]);

  return (
    <>
      <option key={categories.parentName} value={categories.parentName}>
        {categories.parentName}
      </option>
    </>
  );
};

export default ChildrenCategory;
