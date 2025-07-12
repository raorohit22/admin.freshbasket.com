import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import useDisableForDemo from "./useDisableForDemo";
import { SidebarContext } from "@/context/SidebarContext";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useStoreSettingSubmit = (id) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(true);
  const [metaImg, setMetaImg] = useState("");
  const [favicon, setFavicon] = useState("");
  const [enabledCOD, setEnabledCOD] = useState(true);
  const [enabledStripe, setEnabledStripe] = useState(true);
  const [enabledRazorPay, setEnabledRazorPay] = useState(true);
  const [enabledFbPixel, setEnableFbPixel] = useState(true);
  const [enabledTawkChat, setEnabledTawkChat] = useState(false);
  const [enabledGoogleLogin, setEnabledGoogleLogin] = useState(true);
  const [enabledGithubLogin, setEnabledGithubLogin] = useState(false);
  const [enabledFacebookLogin, setEnabledFacebookLogin] = useState(false);
  const [enabledGoogleAnalytics, setEnabledGoogleAnalytics] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleDisableForDemo } = useDisableForDemo();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (handleDisableForDemo()) {
      return; // Exit the function if the feature is disabled
    }
    try {
      setIsSubmitting(true);
      const settingData = {
        name: "storeSetting",
        setting: {
          cod_status: enabledCOD,
          stripe_status: enabledStripe,
          razorpay_status: enabledRazorPay,
          stripe_key: data.stripe_key,
          stripe_secret: data.stripe_secret,
          razorpay_id: data.razorpay_id,
          razorpay_secret: data.razorpay_secret,
          google_login_status: enabledGoogleLogin,
          github_login_status: enabledGithubLogin,
          facebook_login_status: enabledFacebookLogin,
          google_id: data.google_id,
          google_secret: data.google_secret,
          github_id: data.github_id,
          github_secret: data.github_secret,
          facebook_id: data.facebook_id,
          facebook_secret: data.facebook_secret,
          // nextauth_secret: data.nextauth_secret,
          // next_api_base_url: data.next_api_base_url,
          google_analytic_status: enabledGoogleAnalytics,
          google_analytic_key: data.google_analytic_key,
          fb_pixel_status: enabledFbPixel,
          fb_pixel_key: data.fb_pixel_key,
          tawk_chat_status: enabledTawkChat,
          tawk_chat_property_id: data.tawk_chat_property_id,
          tawk_chat_widget_id: data.tawk_chat_widget_id,
        },
      };

      // console.log("store setting", settingData, "data", data);
      // return;

      if (!isSave) {
        const res = await SettingServices.updateStoreSetting(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess(res.message);
      } else {
        const res = await SettingServices.addStoreSetting(settingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        window.location.reload();
        notifySuccess(res.message);
      }
    } catch (err) {
      // console.log("err", err);
      notifyError(err?.response?.data?.message || err?.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getStoreSetting();
        // console.log("res>>>", res);
        if (res) {
          setIsSave(false);
          // for store setting
          setEnabledCOD(res.cod_status);
          setEnabledStripe(res.stripe_status);
          setEnabledRazorPay(res.razorpay_status);
          setEnableFbPixel(res.fb_pixel_status);
          setEnabledTawkChat(res.tawk_chat_status);
          setEnabledGoogleLogin(res.google_login_status);
          setEnabledGithubLogin(res.github_login_status);
          setEnabledFacebookLogin(res.facebook_login_status);
          setEnabledGoogleAnalytics(res.google_analytic_status);
          setValue("stripe_key", res.stripe_key);
          setValue("stripe_secret", res.stripe_secret);
          setValue("razorpay_id", res.razorpay_id);
          setValue("razorpay_secret", res.razorpay_secret);
          setValue("google_id", res.google_id);
          setValue("google_secret", res.google_secret);
          setValue("github_id", res.github_id);
          setValue("github_secret", res.github_secret);
          setValue("facebook_id", res.facebook_id);
          setValue("facebook_secret", res.facebook_secret);
          // setValue("nextauth_secret", res.nextauth_secret);
          // setValue("next_api_base_url", res.next_api_base_url);
          setValue("google_analytic_key", res.google_analytic_key);
          setValue("fb_pixel_key", res.fb_pixel_key);
          setValue("tawk_chat_property_id", res.tawk_chat_property_id);
          setValue("tawk_chat_widget_id", res.tawk_chat_widget_id);
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
      }
    })();
  }, []);

  return {
    errors,
    register,
    isSave,
    favicon,
    setFavicon,
    metaImg,
    setMetaImg,
    isSubmitting,
    onSubmit,
    handleSubmit,
    enabledCOD,
    setEnabledCOD,
    enabledStripe,
    setEnabledStripe,
    enabledRazorPay,
    setEnabledRazorPay,
    enabledFbPixel,
    setEnableFbPixel,
    enabledTawkChat,
    setEnabledTawkChat,
    enabledGoogleLogin,
    setEnabledGoogleLogin,
    enabledGithubLogin,
    setEnabledGithubLogin,
    enabledFacebookLogin,
    setEnabledFacebookLogin,
    enabledGoogleAnalytics,
    setEnabledGoogleAnalytics,
  };
};

export default useStoreSettingSubmit;
