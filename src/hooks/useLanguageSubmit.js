import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import LanguageServices from "@/services/LanguageServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useLanguageSubmit = (id) => {
  const [flagAndName, setFlagAndName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languagePublished, setLanguagePublished] = useState(true);

  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, iso_code, language_code }) => {
    // console.log(name, iso_code, language_code)
    // return notifyError("This option disabled for this option!");
    try {
      setIsSubmitting(true);
      const languageData = {
        name,
        language_code,
        iso_code,
        flag: flagAndName,
        status: languagePublished ? "show" : "hide",
      };

      if (id) {
        const res = await LanguageServices.updateLanguage(id, languageData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        setFlagAndName("");
        closeDrawer();
      } else {
        const res = await LanguageServices.addLanguage(languageData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        setFlagAndName("");
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("iso_code");
      setValue("flag");
      setLanguagePublished(true);
      setFlagAndName("");
      clearErrors("name");
      clearErrors("iso_code");
      clearErrors("flag");
      clearErrors("status");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await LanguageServices.getLanguageById(id);
          if (res) {
            setValue("name", res.name);
            setValue("iso_code", res.iso_code);
            setLanguagePublished(res.status === "show");
            setFlagAndName(res.flag);
            setValue("status", res.status);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err?.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors]);

  return {
    onSubmit,
    register,
    errors,
    handleSubmit,
    flagAndName,
    setFlagAndName,
    isSubmitting,
    languagePublished,
    setLanguagePublished,
  };
};

export default useLanguageSubmit;
