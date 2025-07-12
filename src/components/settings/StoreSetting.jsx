import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";

const StoreSetting = ({
  isSave,
  errors,
  register,
  isSubmitting,
  enabledCOD,
  setEnabledCOD,
  enabledStripe,
  setEnabledStripe,
  enabledFbPixel,
  setEnableFbPixel,
  enabledTawkChat,
  setEnabledTawkChat,
  enabledGoogleLogin,
  setEnabledGoogleLogin,
  enabledGoogleAnalytics,
  setEnabledGoogleAnalytics,
}) => {
  const { t } = useTranslation();

  const handleEnableDisableMethod = (checked, event, id) => {
    if (id === "stripe" && !checked) {
      setEnabledStripe(!enabledStripe);
      setEnabledCOD(true);
    } else if (id === "stripe" && checked) {
      setEnabledStripe(!enabledStripe);
    } else if (id === "cod" && !checked) {
      setEnabledCOD(!enabledCOD);
      setEnabledStripe(true);
    } else {
      setEnabledCOD(!enabledCOD);
    }
    // console.log("value", checked, "event", event.target.value, "id", id);
  };

  return (
    <div className="grid grid-cols-12 font-sans">
      <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3 ">
        <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableCOD")} <br />
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                (This is enabled by default)
              </span>
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="cod"
                processOption={enabledCOD}
                handleProcess={handleEnableDisableMethod}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableStripe")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="stripe"
                processOption={enabledStripe}
                handleProcess={handleEnableDisableMethod}
              />
            </div>
          </div>

          <div
            style={{
              height: enabledStripe ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledStripe ? "hidden" : "visible",
              opacity: !enabledStripe ? "0" : "1",
            }}
            className={`${enabledStripe ? "mb-8" : "mb-2"}`}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("StripeKey")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledStripe}
                  register={register}
                  label={t("StripeKey")}
                  name="stripe_key"
                  type="text"
                  placeholder={t("StripeKey")}
                />
                <Error errorName={errors.stripe_key} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("StripeSecret")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledStripe}
                  register={register}
                  label={t("StripeSecret")}
                  name="stripe_secret"
                  type="text"
                  placeholder={t("StripeSecret")}
                />
                <Error errorName={errors.stripe_secret} />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableGoogleLogin")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="google_login"
                processOption={enabledGoogleLogin}
                handleProcess={setEnabledGoogleLogin}
              />
            </div>
          </div>
          <div
            style={{
              height: enabledGoogleLogin ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledGoogleLogin ? "hidden" : "visible",
              opacity: !enabledGoogleLogin ? "0" : "1",
            }}
            className={`${enabledGoogleLogin ? "mb-8" : "mb-2"}`}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("GoogleClientId")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledGoogleLogin}
                  register={register}
                  label={t("GoogleClientId")}
                  name="google_client_id"
                  type="text"
                  placeholder={t("GoogleClientId")}
                />
                <Error errorName={errors.google_client_id} />
              </div>
            </div>
            {/* <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("GoogleSecret")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                 required={enabledGoogleLogin}
                  register={register}
                  label={t("GoogleSecret")}
                  name="google_secret_key"
                  type="text"
                  placeholder={t("GoogleSecret")}
                />
                <Error errorName={errors.google_secret_key} />
              </div>
            </div> */}
          </div>
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableGoggleAnalytics")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="google_analytics"
                processOption={enabledGoogleAnalytics}
                handleProcess={setEnabledGoogleAnalytics}
              />
            </div>
          </div>
          <div
            style={{
              height: enabledGoogleAnalytics ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledGoogleAnalytics ? "hidden" : "visible",
              opacity: !enabledGoogleAnalytics ? "0" : "1",
            }}
            className={`${
              enabledGoogleAnalytics
                ? "grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                : "mb-2"
            }`}
          >
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("GoogleAnalyticKey")}
            </label>
            <div className="sm:col-span-4">
              <InputAreaTwo
                required={enabledGoogleAnalytics}
                register={register}
                label={t("GoogleAnalyticKey")}
                name="google_analytic_key"
                type="text"
                placeholder={t("GoogleAnalyticKey")}
              />
              <Error errorName={errors.google_analytic_key} />
            </div>
          </div>
          {/* <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableFacebookPixel")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="facebook_pixel"
                processOption={enabledFbPixel}
                handleProcess={setEnableFbPixel}
              />
            </div>
          </div>
          <div
            style={{
              height: enabledFbPixel ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledFbPixel ? "hidden" : "visible",
              opacity: !enabledFbPixel ? "0" : "1",
            }}
            className={`${
              enabledFbPixel
                ? "grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                : "mb-2"
            }`}
          >
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("FacebookPixelKey")}
            </label>
            <div className="sm:col-span-4">
              <InputAreaTwo
                required
                register={register}
                label={t("FacebookPixelKey")}
                name="fb_pixel_key"
                type="text"
                placeholder={t("FacebookPixelKey")}
              />
              <Error errorName={errors.fb_pixel_key} />
            </div>
          </div> */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableTawkChat")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="tawk_chat"
                processOption={enabledTawkChat}
                handleProcess={setEnabledTawkChat}
              />
            </div>
          </div>
          <div
            style={{
              height: enabledTawkChat ? "auto" : 0,
              transition: "all .6s",
              visibility: !enabledTawkChat ? "hidden" : "visible",
              opacity: !enabledTawkChat ? "0" : "1",
            }}
            className={`${enabledTawkChat ? "mb-8" : "mb-2"}`}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("TawkChatPropertyID")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledTawkChat}
                  register={register}
                  label={t("TawkChatPropertyID")}
                  name="tawk_chat_property_id"
                  type="text"
                  placeholder={t("TawkChatPropertyID")}
                />
                <Error errorName={errors.tawk_chat_property_id} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("TawkChatWidgetID")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledTawkChat}
                  register={register}
                  label={t("TawkChatWidgetID")}
                  name="tawk_chat_widget_id"
                  type="text"
                  placeholder={t("TawkChatWidgetID")}
                />
                <Error errorName={errors.tawk_chat_widget_id} />
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse pb-6">
            {isSubmitting ? (
              <Button disabled={true} type="button" className="h-12">
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="font-serif ml-2 font-light">Processing</span>
              </Button>
            ) : (
              <Button type="submit" className="h-12 px-8">
                {" "}
                {isSave ? "Save" : "Update"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSetting;
