import Cookies from "js-cookie";
import { useContext } from "react";

//internal import
import { notifyError } from "@/utils/toast";
import { AdminContext } from "@/context/AdminContext";

const useError = () => {
  const { dispatch } = useContext(AdminContext);

  const handleErrorNotification = async (err, from, time = 1000) => {
    console.log(
      `handleErrorNotification, error on ${from}`,
      err?.response?.data?.message || err?.message
    );
    if (
      err?.response?.data?.message === "jwt expired" ||
      err?.response?.data?.message === "jwt malformed" ||
      err?.response?.data?.message === "invalid signature" ||
      err?.response?.data?.message === "Unauthorized Access!"
    ) {
      console.log("inside", err?.response?.data?.message);
      dispatch({ type: "USER_LOGOUT" });
      Cookies.remove("adminInfo");

      // notifyError("Your Session is expired! Please Click on Login again");
      const timeoutId = setTimeout(() => {
        // history?.replace(`/login`);
        window.location.replace(
          `https://${import.meta.env.VITE_APP_ADMIN_DOMAIN}/login`
        );
      }, 2500);
      return () => clearTimeout(timeoutId);
    } else {
      notifyError(err?.response?.data?.message || err?.message, time);
    }
  };

  return {
    handleErrorNotification,
  };
};

export default useError;
