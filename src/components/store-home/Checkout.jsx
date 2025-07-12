import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";

const Checkout = ({ isSave, errors, register, isSubmitting }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12 pr-3">
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
          {t("Checkout")}
        </div>
        <hr className="md:mb-12 mb-3" />

        <div className="flex justify-between md:text-base text-sm mb-3  dark:text-gray-400 relative">
          <div className="w-full text-gray-500">
            <strong>{t("PersonalInfo")}</strong>
          </div>
          <div className="w-full">
            <InputAreaTwo
              register={register}
              label={t("PersonalInfo")}
              name="personal_details"
              type="text"
              placeholder={t("PersonalInfo")}
            />
            <Error errorName={errors.personal_details} />
          </div>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("firstName")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("firstName")}
              name="first_name"
              type="text"
              placeholder={t("firstName")}
            />
            <Error errorName={errors.first_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("firstName")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("firstName")}
              name="first_name"
              type="text"
              placeholder={t("firstName")}
            />
            <Error errorName={errors.first_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("lastName")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("lastName")}
              name="last_name"
              type="text"
              placeholder={t("lastName")}
            />
            <Error errorName={errors.last_name} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("emailAddress")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("emailAddress")}
              name="email_address"
              type="text"
              placeholder={t("emailAddress")}
            />
            <Error errorName={errors.email_address} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("Phone")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("Phone")}
              name="checkout_phone"
              type="text"
              placeholder={t("Phone")}
            />
            <Error errorName={errors.checkout_phone} />
          </div>
        </div>

        <div className="flex justify-between md:text-base text-sm mb-3 mt-12 dark:text-gray-400 relative">
          <div className="w-full text-gray-500">
            <strong>{t("ShippingInfo")}</strong>
          </div>
          <div className="w-full">
            <InputAreaTwo
              register={register}
              label={t("ShippingInfo")}
              name="shipping_details"
              type="text"
              placeholder={t("ShippingInfo")}
            />
            <Error errorName={errors.shipping_details} />
          </div>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("streetAddress")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("streetAddress")}
              name="street_address"
              type="text"
              placeholder={t("streetAddress")}
            />
            <Error errorName={errors.street_address} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("City")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("City")}
              name="city"
              type="text"
              placeholder={t("City")}
            />
            <Error errorName={errors.city} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("Country")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("Country")}
              name="country"
              type="text"
              placeholder={t("Country")}
            />
            <Error errorName={errors.country} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ZipCode")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ZipCode")}
              name="zip_code"
              type="text"
              placeholder={t("ZipCode")}
            />
            <Error errorName={errors.zip_code} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("Shippingcost")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("Shippingcost")}
              name="shipping_cost"
              type="text"
              placeholder={t("Shippingcost")}
            />
            <Error errorName={errors.shipping_cost} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingNameOne")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingNameOne")}
              name="shipping_name_one"
              type="text"
              placeholder={t("ShippingNameOne")}
            />
            <Error errorName={errors.shipping_name_one} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingOneDes")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingOneDes")}
              name="shipping_one_desc"
              type="text"
              placeholder={t("ShippingOneDes")}
            />
            <Error errorName={errors.shipping_one_desc} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingOneCost")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingOneCost")}
              name="shipping_one_cost"
              type="text"
              placeholder={t("ShippingOneCost")}
            />
            <Error errorName={errors.shipping_one_cost} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingNameTwo")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingNameTwo")}
              name="shipping_name_two"
              type="text"
              placeholder={t("ShippingNameTwo")}
            />
            <Error errorName={errors.shipping_name_two} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingTwoDes")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingTwoDes")}
              name="shipping_two_desc"
              type="text"
              placeholder={t("ShippingTwoDes")}
            />
            <Error errorName={errors.shipping_two_desc} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ShippingTwoCost")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ShippingTwoCost")}
              name="shipping_two_cost"
              type="text"
              placeholder={t("ShippingTwoCost")}
            />
            <Error errorName={errors.shipping_two_cost} />
          </div>

          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("PaymentMethod")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("PaymentMethod")}
              name="payment_method"
              type="text"
              placeholder={t("PaymentMethod")}
            />
            <Error errorName={errors.payment_method} />
          </div>

          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ContinueButton")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ContinueButton")}
              name="continue_button"
              type="text"
              placeholder={t("ContinueButton")}
            />
            <Error errorName={errors.continue_button} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ConfirmButton")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ConfirmButton")}
              name="confirm_button"
              type="text"
              placeholder={t("ConfirmButton")}
            />
            <Error errorName={errors.confirm_button} />
          </div>
        </div>
        <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
          <strong>{t("CartItemSection")}</strong>
        </div>

        <hr className="md:mb-8 mb-3" />
        <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("OrderSummary")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("OrderSummary")}
              name="order_summary"
              type="text"
              placeholder={t("OrderSummary")}
            />
            <Error errorName={errors.order_summary} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("ApplyButton")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("ApplyButton")}
              name="apply_button"
              type="text"
              placeholder={t("ApplyButton")}
            />
            <Error errorName={errors.apply_button} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("Subtotal")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("Subtotal")}
              name="sub_total"
              type="text"
              placeholder={t("Subtotal")}
            />
            <Error errorName={errors.sub_total} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("DiscountLower")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("DiscountLower")}
              name="discount"
              type="text"
              placeholder={t("DiscountLower")}
            />
            <Error errorName={errors.discount} />
          </div>
          <div className="col-span-4">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("TotalCost")}
            </label>
            <InputAreaTwo
              register={register}
              label={t("TotalCost")}
              name="total_cost"
              type="text"
              placeholder={t("TotalCost")}
            />
            <Error errorName={errors.total_cost} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
