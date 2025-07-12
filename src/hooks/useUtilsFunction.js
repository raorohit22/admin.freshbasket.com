import dayjs from "dayjs";
import { useContext, useMemo } from "react";

//internal imports
import { SidebarContext } from "@/context/SidebarContext";
import LanguageServices from "@/services/LanguageServices";
import SettingServices from "@/services/SettingServices";
import { useQuery } from "@tanstack/react-query";

const useUtilsFunction = () => {
  const { lang } = useContext(SidebarContext);

  const {
    error,
    isLoading: loading,
    data: globalSetting,
  } = useQuery({
    queryKey: ["globalSetting"],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 20 * 60 * 1000, //cache for 20 minutes,
    gcTime: 25 * 60 * 1000,
  });

  const {
    data: languages,
    error: langError,
    isLoading: langLoading,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => await LanguageServices.getShowingLanguage(),
    staleTime: 20 * 60 * 1000, //cache for 20 minutes,
    gcTime: 25 * 60 * 1000,
  });

  // console.log("globalSetting", globalSetting, "language", languages);
  //for date and time format
  const showTimeFormat = (data, timeFormat) => {
    return dayjs(data).format(timeFormat);
  };

  const showDateFormat = (data) => {
    return dayjs(data).format(globalSetting?.default_date_format);
  };

  const showDateTimeFormat = (data) => {
    return dayjs(data).format(`${globalSetting?.default_date_format}  h:mm A`);
  };

  //for formatting number

  const getNumber = (value = 0) => {
    return Number(parseFloat(value || 0).toFixed(2));
  };

  const getNumberTwo = (value = 0) => {
    return parseFloat(value || 0).toFixed(globalSetting?.floating_number || 2);
  };

  //for translation
  const showingTranslateValue = useMemo(() => {
    return (data) => {
      if (!data || typeof data !== "object") return ""; // Handle undefined or non-object cases

      return (
        data[lang] ?? data[globalSetting?.default_language] ?? data["en"] ?? ""
      );
    };
  }, [lang, globalSetting?.default_language]);

  const showingImage = (data) => {
    return data !== undefined && data;
  };

  const showingUrl = (data) => {
    return data !== undefined ? data : "!#";
  };

  const currency = globalSetting?.default_currency || "$";

  return {
    error,
    loading,
    currency,
    getNumber,
    langError,
    langLoading,
    getNumberTwo,
    showTimeFormat,
    showDateFormat,
    showingImage,
    showingUrl,
    languages,
    globalSetting,
    showDateTimeFormat,
    showingTranslateValue,
  };
};

export default useUtilsFunction;
