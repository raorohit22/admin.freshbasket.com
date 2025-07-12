import { Select } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

//internal import

import useAsync from "@/hooks/useAsync";
import CategoryServices from "@/services/CategoryServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const SelectCategory = ({ setCategory }) => {
  // console.log('data category',data)
  const { t } = useTranslation();
  const { data } = useAsync(CategoryServices.getAllCategories);
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <Select onChange={(e) => setCategory(e.target.value)}>
        <option value="All" defaultValue hidden>
          {t("Category")}
        </option>
        {data?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {showingTranslateValue(cat?.name)}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCategory;
