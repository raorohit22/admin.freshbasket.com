import React from "react";
import SelectLanguageTwo from "@/components/form/selectOption/SelectLanguageTwo";

const Title = ({ title, description, handleSelectLanguage, register }) => {
  return (
    <>
      <div className="flex md:flex-row flex-col justify-between mr-20">
        <div>
          <h4 className="text-xl font-medium dark:text-gray-300">{title}</h4>
          <p className="mb-0 text-sm dark:text-gray-300">{description}</p>
        </div>
        {handleSelectLanguage && (
          <SelectLanguageTwo
            handleSelectLanguage={handleSelectLanguage}
            register={register}
          />
        )}
      </div>
    </>
  );
};

export default Title;
