import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";

//internal import
import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/others/TextAreaCom";

const SinglePageSetting = ({
  isSave,
  register,
  errors,
  isSubmitting,
  singleProductPageRightBox,
  setSingleProductPageRightBox,
}) => {
  const { t } = useTranslation();

  return (
    <>
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
      <div className="grid grid-cols-12 font-sans pr-4">
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 relative">
            <FiSettings className="mt-1 mr-2" />
            {t("RightBox")}
          </div>

          <hr className="md:mb-12 mb-2" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-2">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setSingleProductPageRightBox}
                  processOption={singleProductPageRightBox}
                  name={singleProductPageRightBox}
                />
              </div>
            </div>

            <div
              style={{
                height: singleProductPageRightBox ? 940 : 0,
                transition: "all 0.5s",
                visibility: !singleProductPageRightBox ? "hidden" : "visible",
                opacity: !singleProductPageRightBox ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} One
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Description"
                    name="slug_page_card_description_one"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_one} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Two
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label=" Description"
                    name="slug_page_card_description_two"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_two} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Three
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Description"
                    name="slug_page_card_description_three"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_three} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Four
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Description"
                    name="slug_page_card_description_four"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_four} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Five
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="slug_page_card_description_five"
                    name="slug_page_card_description_five"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_five} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Six
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Description"
                    name="slug_page_card_description_six"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_six} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                  {t("Description")} Seven
                </label>
                <div className=" sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label=" Description"
                    name="slug_page_card_description_seven"
                    type="text"
                    placeholder={t("Description")}
                  />

                  <Error errorName={errors.slug_page_card_description_seven} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePageSetting;
