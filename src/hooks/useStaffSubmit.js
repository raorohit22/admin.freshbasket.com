import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

//internal import
import AdminServices from "@/services/AdminServices";
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import useTranslationValue from "./useTranslationValue";

const useStaffSubmit = (id) => {
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [language, setLanguage] = useState("en");
  const [resData, setResData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessedRoutes, setAccessedRoutes] = useState([]);

  const location = useLocation();

  // console.log("adminInfo", adminInfo);

  const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleRemoveEmptyKey = (obj) => {
    for (const key in obj) {
      if (obj[key].trim() === "") {
        delete obj[key];
      }
    }
    // console.log("obj", obj);
    return obj;
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const nameTranslates = await handlerTextTranslateHandler(
        data.name,
        language,
        resData?.name
      );

      const staffData = {
        name: {
          ...nameTranslates,
          [language]: data.name,
        },
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        access_list: accessedRoutes?.map((list) => list.value),
        joiningDate: selectedDate
          ? selectedDate
          : dayjs(new Date()).format("YYYY-MM-DD"),
        image: imageUrl,
        lang: language,
      };

      // console.log("staffData", staffData);
      // return;
      const isSameAdmin = adminInfo?._id === resData?._id;
      // console.log("isSameAdmin", isSameAdmin);
      // return setIsSubmitting(false);
      // const superAdmin = "Super Admin";

      // const allowedRoles = {
      //   [superAdmin]: [
      //     "Super Admin",
      //     "Admin",
      //     "Cashier",
      //     "CEO",
      //     "Manager",
      //     "Accountant",
      //     "Driver",
      //     "Security Guard",
      //     "Deliver Person",
      //   ], // Can update all roles
      //   Admin: [
      //     "Admin",
      //     "Cashier",
      //     "CEO",
      //     "Manager",
      //     "Accountant",
      //     "Driver",
      //     "Security Guard",
      //     "Deliver Person",
      //   ], // Can update Admin and Cashier
      //   CEO: [
      //     "Admin",
      //     "Cashier",
      //     "CEO",
      //     "Manager",
      //     "Accountant",
      //     "Driver",
      //     "Security Guard",
      //     "Deliver Person",
      //   ], // Can update Admin and Cashier
      //   Manager: [
      //     "Manager",
      //     "Accountant",
      //     "Driver",
      //     "Security Guard",
      //     "Deliver Person",
      //   ], // Can update only Manager
      //   Accountant: ["Accountant"], // Can update only Accountant
      //   Driver: ["Driver"], // Can update only Driver
      //   Cashier: ["Cashier"], // Can update only Cashier
      // };

      // if (!allowedRoles[staff?.role]?.includes(data?.role)) {
      //   // If the logged-in admin's role doesn't allow updating the selected role
      //   notifyError(
      //     `You are not allowed to update staff with the role: ${data?.role}`
      //   );
      //   setIsSubmitting(false);
      //   return;
      // }

      if (id) {
        // console.log('id is ',id)
        const res = await AdminServices.updateStaff(id, staffData);

        if (isSameAdmin) {
          dispatch({ type: "USER_LOGIN", payload: res });
          const cookieTimeOut = 0.5;
          Cookies.set("adminInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
            sameSite: "None",
            secure: true,
          });
        }
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Staff Updated Successfully!");
        closeDrawer();
      } else {
        const res = await AdminServices.addStaff(staffData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const getStaffData = async () => {
    try {
      const res = await AdminServices.getStaffById(id, {
        email: adminInfo.email,
      });

      // console.log("res", res);

      if (res) {
        setResData(res);
        setValue("name", res.name[language ? language : "en"]);
        setValue("email", res.email);
        setValue("password");
        setValue("phone", res.phone);
        setValue("role", res.role);
        setSelectedDate(dayjs(res.joiningData).format("YYYY-MM-DD"));
        setImageUrl(res.image);
        const result = res?.access_list?.map((list) => {
          const newObj = {
            label: list,
            value: list,
          };
          return newObj;
        });
        setAccessedRoutes(result);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);

    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("phone");
      setValue("role");
      setValue("joiningDate");
      setImageUrl("");
      clearErrors("name");
      clearErrors("email");
      clearErrors("password");
      clearErrors("phone");
      clearErrors("role");
      clearErrors("joiningDate");
      setImageUrl("");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  useEffect(() => {
    if (location.pathname === "/edit-profile" && Cookies.get("adminInfo")) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    language,
    errors,
    adminInfo,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    accessedRoutes,
    setAccessedRoutes,
    handleSelectLanguage,
  };
};

export default useStaffSubmit;
