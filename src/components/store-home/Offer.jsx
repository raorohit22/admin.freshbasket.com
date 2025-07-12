import { Button, WindmillContext } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { useContext } from "react";
import { MultiSelect } from "react-multi-select-component";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";

const Offer = ({
  errors,
  isSave,
  coupons,
  register,
  setOffersPageHeader,
  offersPageHeader,
  setOffersHeaderBg,
  offersHeaderBg,
  couponList1,
  setCouponList1,
  isSubmitting,
}) => {
  const { mode } = useContext(WindmillContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12 pr-4">
        <div className="sticky top-0 z-20 flex justify-end">
          {isSubmitting ? (
            <Button disabled={true} type="button" className="h-10 px-6">
              <img
                src={spinnerLoadingImage}
                alt="Loading"
                width={20}
                height={10}
              />{" "}
              <span className="font-serif ml-2 font-light">
                {" "}
                {t("Processing")}
              </span>
            </Button>
          ) : (
            <Button type="submit" className="h-10 px-6 ">
              {" "}
              {isSave ? t("SaveBtn") : t("UpdateBtn")}
            </Button>
          )}
        </div>

        <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
          <FiSettings className="mt-1 mr-2" />
          {t("Offers")}
        </div>
        <hr className="md:mb-10 mb-3" />

        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t("PageHeader")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setOffersPageHeader}
                processOption={offersPageHeader}
                name={offersPageHeader}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: offersPageHeader ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !offersPageHeader ? "hidden" : "visible",
              opacity: !offersPageHeader ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("PageHeaderBg")}
              </label>
              <div className="sm:col-span-4">
                <Uploader
                  imageUrl={offersHeaderBg}
                  setImageUrl={setOffersHeaderBg}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("PageTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Page Title"
                  name="offers_page_title"
                  type="text"
                  placeholder={t("PageTitle")}
                />
                <Error errorName={errors.offers_page_title} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("SuperDiscountActiveCouponCode")}
              </label>
              <div className="sm:col-span-4">
                <MultiSelect
                  options={coupons}
                  value={couponList1}
                  className={mode}
                  onChange={(v) => setCouponList1(v)}
                  labelledBy="Select Coupon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
