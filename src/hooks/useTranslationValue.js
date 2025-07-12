// internal imports
import useUtilsFunction from "./useUtilsFunction";
import TextTranslateServices from "@/services/TextTranslateServices";

const useTranslationValue = () => {
  const { globalSetting, languages } = useUtilsFunction();

  // console.log("globalSetting", globalSetting);

  // Check if any key-value pair in the current data is invalid (e.g., contains error message)
  const cleanInvalidTranslations = (currentData) => {
    if (!currentData) return currentData;

    const validData = { ...currentData };

    Object.keys(validData).forEach((lang) => {
      const translation = validData[lang];

      // Check if the translation contains error messages or is invalid
      if (
        translation?.toLowerCase().includes("authentication failure") ||
        translation?.toLowerCase().includes("error") ||
        !translation
      ) {
        console.log(`Removing invalid translation for language: ${lang}`);
        delete validData[lang]; // Remove invalid translations
        // validData[lang] = ""; // Clear the invalid translation value, keep the key
      }
    });

    return validData;
  };

  const hasKeyChanged = (currentData, updatedData) => {
    const langIsoCodes = languages?.map((lang) => lang?.iso_code);
    // console.log(
    //   "currentData",
    //   currentData,
    //   "updatedData",
    //   updatedData,
    //   "langIsoCodes",
    //   langIsoCodes
    // );

    //if currentData not have then it's new data so, need to add the translation
    if (!currentData) return true;

    // Ensure valid data
    if (!updatedData || !langIsoCodes?.length) return false;

    return langIsoCodes?.some((lang) => {
      if (!currentData[lang]) return true;

      // Check if the language exists in both current and updated data
      if (!updatedData[lang]) return false;

      // Compare values for the language
      return currentData[lang] !== updatedData[lang];
    });
  };

  // translate api call
  const handleTranslateCallApi = async (text, tnsForm, tnsTo) => {
    const key =
      globalSetting?.translation_key ||
      import.meta.env.VITE_APP_MYMEMORY_API_KEY;
    try {
      const res = await TextTranslateServices.translateText(
        text,
        tnsForm,
        tnsTo,
        key
      );

      const translatedText = res?.responseData?.translatedText;
      // Check if the response contains an error message instead of valid translation
      if (
        translatedText?.toLowerCase().includes("authentication failure") ||
        translatedText?.toLowerCase().includes("error") ||
        !translatedText
      ) {
        console.error(
          `Translation API failed for ${tnsForm} to ${tnsTo}:`,
          translatedText
        );
        return null; // Return null to indicate failure
      }
      return translatedText;
    } catch (error) {
      console.error("error on translation", error);
      return null;
    }
  };

  // text translate handler
  const handlerTextTranslateHandler = async (text, tnsForm, currentData) => {
    // const getAllLanguages = await LanguageServices.getAllLanguages();

    // First, clean up invalid translations from current data
    const cleanedCurrentData = cleanInvalidTranslations(currentData);
    if (!globalSetting?.allow_auto_trans) return false;

    const isKeyUpdated =
      hasKeyChanged(cleanedCurrentData, { [tnsForm]: text }) || false;

    // console.log("isKeyUpdated", isKeyUpdated);
    if (!isKeyUpdated) return false;

    const filterLanguage = languages?.filter(
      (lan) => lan?.iso_code !== tnsForm
    );

    // console.log("filterLanguage", filterLanguage);
    // return;

    const promisesArray = filterLanguage.map((lan) => {
      return text
        ? handleTranslateCallApi(text?.toLowerCase(), tnsForm, lan?.iso_code)
        : "";
    });

    const results = await Promise.all(promisesArray);

    // const languageArray = filterLanguage.map((lan, index) => {
    //   return {
    //     lang: lan?.iso_code,
    //     text: results[index],
    //   };
    // });

    // let objectTnsLanguage = languageArray.reduce(
    //   (obj, item) => Object.assign(obj, { [item.lang]: item.text }),
    //   {}
    // );
    // Filter out null or empty translations
    const languageArray = filterLanguage
      .map((lan, index) => {
        const translation = results[index];
        return translation ? { lang: lan?.iso_code, text: translation } : null;
      })
      .filter(Boolean); // Remove null values

    // Only include translations that are valid (non-null)
    let objectTnsLanguage = languageArray.reduce(
      (obj, item) => Object.assign(obj, { [item.lang]: item.text }),
      {}
    );
    // Add the original text (for example, in English) if it exists in the cleaned data
    if (cleanedCurrentData && cleanedCurrentData[tnsForm]) {
      objectTnsLanguage[tnsForm] = cleanedCurrentData[tnsForm];
    }

    return objectTnsLanguage;
  };

  const handleRemoveEmptyKey = (obj) => {
    for (const key in obj) {
      if (obj[key].trim() === "") {
        delete obj[key];
      }
    }
    // console.log("obj", obj);
    return obj;
  };

  return {
    hasKeyChanged,
    handleRemoveEmptyKey,
    handlerTextTranslateHandler,
  };
};

export default useTranslationValue;
