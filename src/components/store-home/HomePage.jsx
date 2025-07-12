import { Button, WindmillContext } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { useContext } from "react";
import { MultiSelect } from "react-multi-select-component";

import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tabs as TabsComponent,
} from "react-tabs";

//internal import
import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import Uploader from "@/components/image-uploader/Uploader";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/others/TextAreaCom";
import SelectProductLimit from "@/components/form/selectOption/SelectProductLimit";

const HomePage = ({
  register,
  errors,
  coupons,
  headerLogo,
  setHeaderLogo,
  sliderImage,
  setSliderImage,
  sliderImageTwo,
  setSliderImageTwo,
  sliderImageThree,
  setSliderImageThree,
  sliderImageFour,
  setSliderImageFour,
  sliderImageFive,
  setSliderImageFive,
  placeholderImage,
  setPlaceHolderImage,
  quickSectionImage,
  setQuickSectionImage,
  getYourDailyNeedImageLeft,
  setGetYourDailyNeedImageLeft,
  getYourDailyNeedImageRight,
  setGetYourDailyNeedImageRight,
  footerLogo,
  setFooterLogo,
  paymentImage,
  setPaymentImage,
  isSave,
  isCoupon,
  isSliderFullWidth,
  setIsCoupon,
  setIsSliderFullWidth,
  featuredCategories,
  setFeaturedCategories,
  popularProducts,
  setPopularProducts,
  setQuickDelivery,
  quickDelivery,
  setLatestDiscounted,
  latestDiscounted,
  setDailyNeeds,
  dailyNeeds,
  setFeaturePromo,
  featurePromo,
  setFooterBlock1,
  footerBlock1,
  setFooterBlock2,
  footerBlock2,
  setFooterBlock3,
  footerBlock3,
  setFooterBlock4,
  footerBlock4,
  setFooterSocialLinks,
  footerSocialLinks,
  setFooterPaymentMethod,
  footerPaymentMethod,
  allowPromotionBanner,
  setAllowPromotionBanner,
  isSubmitting,
  setLeftRightArrow,
  leftRightArrow,
  setBottomDots,
  bottomDots,
  setBothSliderOption,
  bothSliderOption,
  getButton1image,
  setGetButton1image,
  getButton2image,
  setGetButton2image,
  setFooterBottomContact,
  footerBottomContact,
  setCategoriesMenuLink,
  categoriesMenuLink,
  setAboutUsMenuLink,
  aboutUsMenuLink,
  setContactUsMenuLink,
  contactUsMenuLink,
  setOffersMenuLink,
  offersMenuLink,
  setFaqMenuLink,
  faqMenuLink,
  setPrivacyPolicyMenuLink,
  privacyPolicyMenuLink,
  setTermsConditionsMenuLink,
  termsConditionsMenuLink,
  couponList,
  setCouponList,
}) => {
  const { mode } = useContext(WindmillContext);
  const { t } = useTranslation();

  // console.log("mode", mode);

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
        {/*  ====================================================== Header ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" />
            {t("Header")}
          </div>

          <hr className="md:mb-6 mb-3" />

          <div className="flex-grow scrollbar-hide w-full max-h-full xl:px-10">
            <div className="inline-flex md:text-base text-sm my-3 text-gray-500 dark:text-gray-400">
              <strong>{t("HeaderContacts")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("HeaderText")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t("HeaderText")}
                  name="help_text"
                  type="text"
                  placeholder={t("weAreAvailable")}
                />
                <Error errorName={errors.help_text} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("PhoneNumber")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t("PhoneNumber")}
                  name="phone_number"
                  type="text"
                  placeholder="+01234560352"
                />
                <Error errorName={errors.phone_number} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("HeaderLogo")}
              </label>
              <div className="sm:col-span-4">
                <Uploader
                  imageUrl={headerLogo}
                  setImageUrl={setHeaderLogo}
                  targetWidth={87}
                  targetHeight={25}
                />
              </div>
            </div>
          </div>

          {/*  ================= Menu Editor ======================== */}
          <div className="grid md:grid-cols-5 sm:grid-cols-6 scrollbar-hide w-full max-h-full pb-0">
            <div className="md:col-span-1 sm:col-span-2"></div>
            <div className="sm:col-span-4 md:pl-3 sm:pl-2">
              <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
                <strong>{t("MenuEditor")}</strong>
              </div>

              <hr className="md:mb-12 mb-3" />

              <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("Categories")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("Categories")}
                    name="categories"
                    type="text"
                    placeholder={t("Categories")}
                  />
                  <Error errorName={errors.categories} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("AboutUs")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("AboutUs")}
                    name="about_us"
                    type="text"
                    placeholder={t("AboutUs")}
                  />
                  <Error errorName={errors.about_us} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("ContactUs")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("ContactUs")}
                    name="contact_us"
                    type="text"
                    placeholder={t("ContactUs")}
                  />
                  <Error errorName={errors.contact_us} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("Offers")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("Offers")}
                    name="offers"
                    type="text"
                    placeholder={t("Offers")}
                  />
                  <Error errorName={errors.offers} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("FAQ")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("FAQ")}
                    name="faq"
                    type="text"
                    placeholder={t("FAQ")}
                  />
                  <Error errorName={errors.faq} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("PrivacyPolicy")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("PrivacyPolicy")}
                    name="privacy_policy"
                    type="text"
                    placeholder={t("PrivacyPolicy")}
                  />
                  <Error errorName={errors.privacy_policy} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("TermsConditions")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("TermsConditions")}
                    name="term_and_condition"
                    type="text"
                    placeholder={t("TermsConditions")}
                  />
                  <Error errorName={errors.term_and_condition} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("Pages")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("Pages")}
                    name="pages"
                    type="text"
                    placeholder={t("Pages")}
                  />
                  <Error errorName={errors.pages} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("MyAccount")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("MyAccount")}
                    name="my_account"
                    type="text"
                    placeholder={t("MyAccount")}
                  />
                  <Error errorName={errors.my_account} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("Login")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("Login")}
                    name="login"
                    type="text"
                    placeholder={t("Login")}
                  />
                  <Error errorName={errors.login} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("Logout")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("Logout")}
                    name="logout"
                    type="text"
                    placeholder={t("Logout")}
                  />
                  <Error errorName={errors.logout} />
                </div>
                <div className="col-span-4">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("CheckOut")}
                  </label>
                  <InputAreaTwo
                    register={register}
                    label={t("CheckOut")}
                    name="checkout"
                    type="text"
                    placeholder={t("CheckOut")}
                  />
                  <Error errorName={errors.checkout} />
                </div>
              </div>

              <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("Categories")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setCategoriesMenuLink}
                    processOption={categoriesMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("AboutUs")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setAboutUsMenuLink}
                    processOption={aboutUsMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("ContactUs")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setContactUsMenuLink}
                    processOption={contactUsMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("Offers")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setOffersMenuLink}
                    processOption={offersMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("FAQ")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setFaqMenuLink}
                    processOption={faqMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("PrivacyPolicy")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setPrivacyPolicyMenuLink}
                    processOption={privacyPolicyMenuLink}
                  />
                </div>
                <div>
                  <h4 className="font-medium font-serif md:text-base text-sm mb-2 dark:text-gray-300">
                    {t("TermsConditions")}
                  </h4>

                  <SwitchToggle
                    title={""}
                    handleProcess={setTermsConditionsMenuLink}
                    processOption={termsConditionsMenuLink}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*  ================== Menu Editor ======================== */}
        </div>

        {/*  ====================================================== Main Slider ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 mt-5">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" /> {t("MainSlider")}
          </div>

          <hr className="mb-3" />

          <div className="flex-grow scrollbar-hide w-full max-h-full xl:px-10">
            <TabsComponent>
              <Tabs>
                <TabList>
                  <Tab>{t("Slider")} 1</Tab>
                  <Tab>{t("Slider")} 2</Tab>
                  <Tab>{t("Slider")} 3</Tab>
                  <Tab>{t("Slider")} 4</Tab>
                  <Tab>{t("Slider")} 5</Tab>
                  <Tab>{t("Options")}</Tab>
                </TabList>

                <TabPanel className="md:mt-10 mt-3">
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderImages")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={sliderImage}
                        setImageUrl={setSliderImage}
                        targetWidth={950}
                        targetHeight={400}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 ">
                      {t("SliderTitle")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("SliderTitle")}
                        name="slider_title"
                        type="text"
                        placeholder={t("SliderTitle")}
                      />
                      <Error errorName={errors.slider_title} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderDescription")}
                    </label>
                    <div className="sm:col-span-4">
                      <TextAreaCom
                        required={true}
                        register={register}
                        label="Slider Description"
                        name="slider_description"
                        type="text"
                        placeholder="Slider Description"
                      />
                      <Error errorName={errors.slider_description} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonName")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("SliderButtonName")}
                        name="slider_button_name"
                        type="text"
                        placeholder={t("SliderButtonName")}
                      />
                      <Error errorName={errors.slider_button_name} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonLink")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Slider Button Link"
                        name="slider_button_link"
                        type="text"
                        placeholder="Slider Button Link"
                      />
                      <Error errorName={errors.slider_button_link} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderImages")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={sliderImageTwo}
                        setImageUrl={setSliderImageTwo}
                        targetWidth={950}
                        targetHeight={400}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderTitle")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Title"
                        name="slider_title_two"
                        type="text"
                        placeholder={t("SliderTitle")}
                      />
                      <Error errorName={errors.slider_title_two} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderDescription")}
                    </label>
                    <div className="sm:col-span-4">
                      <TextAreaCom
                        register={register}
                        label="Slider Description Two"
                        name="slider_description_two"
                        type="text"
                        placeholder={t("SliderDescription")}
                      />
                      <Error errorName={errors.slider_description_two} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonName")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Name"
                        name="slider_button_name_two"
                        type="text"
                        placeholder={t("SliderButtonName")}
                      />
                      <Error errorName={errors.slider_button_name_two} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonLink")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Link"
                        name="slider_button_link_two"
                        type="text"
                        placeholder={t("SliderButtonLink")}
                      />
                      <Error errorName={errors.slider_button_link_two} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm  md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderImages")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={sliderImageThree}
                        setImageUrl={setSliderImageThree}
                        targetWidth={950}
                        targetHeight={400}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderTitle")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label=" Slider Title"
                        name="slider_title_three"
                        type="text"
                        placeholder={t("SliderTitle")}
                      />
                      <Error errorName={errors.slider_title_three} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderDescription")}
                    </label>
                    <div className="sm:col-span-4">
                      <TextAreaCom
                        register={register}
                        label="Slider Description"
                        name="slider_description_three"
                        type="text"
                        placeholder={t("SliderDescription")}
                      />

                      <Error errorName={errors.slider_description_three} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonName")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Name"
                        name="slider_button_name_three"
                        type="text"
                        placeholder={t("SliderButtonName")}
                      />
                      <Error errorName={errors.slider_button_name_three} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonLink")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Link"
                        name="slider_button_link_three"
                        type="text"
                        placeholder={t("SliderButtonLink")}
                      />
                      <Error errorName={errors.slider_button_link_three} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderImages")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={sliderImageFour}
                        setImageUrl={setSliderImageFour}
                        targetWidth={950}
                        targetHeight={400}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderTitle")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label=" Slider Title"
                        name="slider_title_four"
                        type="text"
                        placeholder={t("SliderTitle")}
                      />
                      <Error errorName={errors.slider_title_four} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderDescription")}
                    </label>
                    <div className="sm:col-span-4">
                      <TextAreaCom
                        register={register}
                        label="Slider Description"
                        name="slider_description_four"
                        type="text"
                        placeholder={t("SliderDescription")}
                      />
                      <Error errorName={errors.slider_description_four} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonName")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Name"
                        name="slider_button_name_four"
                        type="text"
                        placeholder={t("SliderButtonName")}
                      />
                      <Error errorName={errors.slider_button_name_four} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonLink")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Link"
                        name="slider_button_link_four"
                        type="text"
                        placeholder={t("SliderButtonLink")}
                      />
                      <Error errorName={errors.slider_button_link_four} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderImages")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={sliderImageFive}
                        setImageUrl={setSliderImageFive}
                        targetWidth={950}
                        targetHeight={400}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderTitle")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label=" Slider Title"
                        name="slider_title_five"
                        type="text"
                        placeholder={t("SliderTitle")}
                      />
                      <Error errorName={errors.slider_title_five} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderDescription")}
                    </label>
                    <div className="sm:col-span-4">
                      <TextAreaCom
                        register={register}
                        label="Slider Description"
                        name="slider_description_five"
                        type="text"
                        placeholder={t("SliderDescription")}
                      />
                      <Error errorName={errors.slider_description_five} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonName")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Name"
                        name="slider_button_name_five"
                        type="text"
                        placeholder={t("SliderButtonName")}
                      />
                      <Error errorName={errors.slider_button_name_five} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("SliderButtonLink")}
                    </label>
                    <div className="sm:col-span-4">
                      <InputAreaTwo
                        register={register}
                        label="Slider Button Link"
                        name="slider_button_link_five"
                        type="text"
                        placeholder={t("SliderButtonLink")}
                      />
                      <Error errorName={errors.slider_button_link_five} />
                    </div>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div className="grid md:grid-cols-3 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                    <div>
                      <div className="relative">
                        <h4 className="font-medium md:text-base text-sm mb-2 dark:text-gray-400">
                          {" "}
                          {t("LeftRighArrows")}
                        </h4>
                      </div>
                      <SwitchToggle
                        title={""}
                        handleProcess={setLeftRightArrow}
                        processOption={leftRightArrow}
                      />
                    </div>
                    <div>
                      <div className="relative">
                        <h4 className="font-medium md:text-base text-sm mb-2 dark:text-gray-400">
                          {t("BottomDots")}
                        </h4>
                      </div>
                      <SwitchToggle
                        title={""}
                        handleProcess={setBottomDots}
                        processOption={bottomDots}
                      />
                    </div>
                    <div>
                      <div className="relative">
                        <h4 className="font-medium md:text-base text-sm mb-2 dark:text-gray-400">
                          {t("Both")}
                        </h4>
                      </div>
                      <SwitchToggle
                        title={""}
                        handleProcess={setBothSliderOption}
                        processOption={bothSliderOption}
                      />
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </TabsComponent>
          </div>
        </div>

        {/*  ======================================================Discount Coupon Code Box ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 mt-5">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" />
            {t("DiscountCouponTitle1")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("ShowHide")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setIsCoupon}
                  processOption={isCoupon}
                  name="isCoupon"
                />
              </div>
            </div>

            <div
              className={`grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative transition-2`}
              style={{
                height: isCoupon ? "auto" : 0,
                transition: "ease-out 0.4s",

                visibility: !isCoupon ? "hidden" : "visible",
                opacity: !isCoupon ? "0" : "1",
              }}
            >
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("HomePageDiscountTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label={t("HomePageDiscountTitle")}
                  name="discount_title"
                  type="text"
                  placeholder={t("HomePageDiscountTitle")}
                />
                <Error errorName={errors.phone_number} />
              </div>
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("SuperDiscountActiveCouponCode")}
              </label>
              <div className="sm:col-span-4">
                <MultiSelect
                  options={coupons}
                  value={couponList}
                  className={mode}
                  onChange={(v) => setCouponList(v)}
                  labelledBy="Select Coupon"
                />
              </div>
            </div>

            <div
              style={{
                height: isCoupon
                  ? "auto"
                  : isSliderFullWidth
                  ? "auto"
                  : isSliderFullWidth
                  ? "auto"
                  : "auto",
                transition: "all 0.5s",
                visibility: isCoupon ? "hidden" : "visible",
                opacity: isCoupon ? "0" : "1",
              }}
            >
              <div>
                <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400">
                  <div className="relative">
                    <strong>{t("SliderFullWidth")}</strong>
                  </div>
                </div>

                <hr className="mb-4 mt-2" />

                <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 ">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    {t("SliderFullWidth")}
                  </label>
                  <div className="sm:col-span-4 ">
                    <SwitchToggle
                      title=""
                      handleProcess={setIsSliderFullWidth}
                      processOption={isSliderFullWidth}
                      name={isSliderFullWidth}
                    />
                  </div>
                </div>
              </div>

              {!isSliderFullWidth && !isCoupon && (
                <div>
                  <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 mt-5 ">
                    <div className="relative">
                      <strong> {t("PlaceHolderImage")} </strong>
                    </div>
                  </div>
                  <hr className="mb-4 mt-2" />

                  <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4 md:mb-6 mb-3 pb-2">
                    <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {t("PlaceHolderImage")}
                    </label>
                    <div className="sm:col-span-4">
                      <Uploader
                        imageUrl={placeholderImage}
                        setImageUrl={setPlaceHolderImage}
                      />
                      <div className="text-xs text-center text-gray-400">
                        <em>( {t("ImagesResolution")} )</em>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*  ====================================================== Promotion Banner ===================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 md:mt-0 mt-10">
            <FiSettings className="mt-1 mr-2" /> {t("PromotionBanner")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setAllowPromotionBanner}
                  processOption={allowPromotionBanner}
                  name={allowPromotionBanner}
                />
              </div>
            </div>

            <div
              style={{
                height: allowPromotionBanner ? "auto" : 0,
                transition: "all 0.4s",
                visibility: !allowPromotionBanner ? "hidden" : "visible",
                opacity: !allowPromotionBanner ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="promotion_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.promotion_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Description")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Promotion Description"
                    name="promotion_description"
                    type="text"
                    placeholder={t("PromotionDescription")}
                  />

                  <Error errorName={errors.promotion_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ButtonName")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Name"
                    name="promotion_button_name"
                    type="text"
                    placeholder={t("ButtonName")}
                  />
                  <Error errorName={errors.promotion_button_name} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ButtonLink")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Link "
                    name="promotion_button_link"
                    type="text"
                    placeholder="https://kachabazar-store.vercel.app/search?category=fruits-vegetable&_id=632aca2b4d87ff2494210be8"
                  />
                  <Error errorName={errors.promotion_button_link} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  ====================================================== Featured Categories ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 md:mt-0 mt-15">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 relative">
            <FiSettings className="mt-1 mr-2" /> {t("FeaturedCategories")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFeaturedCategories}
                  processOption={featuredCategories}
                  name={featuredCategories}
                />
              </div>
            </div>

            <div
              style={{
                height: featuredCategories ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !featuredCategories ? "hidden" : "visible",
                opacity: !featuredCategories ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="feature_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.feature_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FeaturedCategories")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Feature Description"
                    name="feature_description"
                    type="text"
                    placeholder={t("FeaturedCategories")}
                  />

                  <Error errorName={errors.feature_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ProductsLimit")}
                </label>
                <div className="sm:col-span-4">
                  <SelectProductLimit
                    register={register}
                    required={true}
                    label="Feature Products Limit"
                    name="feature_product_limit"
                  />
                  <Error errorName={errors.feature_product_limit} />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-row-reverse pb-6">
                  <Button type="submit" className="h-10 px-6">
                    Save
                  </Button>
                </div> */}
          </div>
        </div>

        {/*  ====================================================== Popular Products ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 md:mt-0 mt-15">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3 relative">
            <FiSettings className="mt-1 mr-2" />
            {t("PopularProductsTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setPopularProducts}
                  processOption={popularProducts}
                  name={popularProducts}
                />
              </div>
            </div>

            <div
              style={{
                height: popularProducts ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !popularProducts ? "hidden" : "visible",
                opacity: !popularProducts ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="popular_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.popular_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Description")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Popular Description"
                    name="popular_description"
                    type="text"
                    placeholder={t("PopularDescription")}
                  />
                  <Error errorName={errors.popular_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ProductsLimit")}
                </label>
                <div className="sm:col-span-4">
                  <SelectProductLimit
                    register={register}
                    required={true}
                    label="Popular Products Limit"
                    name="popular_product_limit"
                  />
                  <Error errorName={errors.popular_product_limit} />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-row-reverse pb-6">
                  <Button type="submit" className="h-10 px-6">
                    Save
                  </Button>
                </div> */}
          </div>
        </div>

        {/*  ====================================================== Quick Delivery Section ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 mt-15">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" />{" "}
            {t("QuickDeliverySectionTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title={""}
                  handleProcess={setQuickDelivery}
                  processOption={quickDelivery}
                  name={quickDelivery}
                />
              </div>
            </div>

            <div
              style={{
                height: quickDelivery ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !quickDelivery ? "hidden" : "visible",
                opacity: !quickDelivery ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("SubTitle")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="quick_delivery_subtitle"
                    type="text"
                    placeholder={t("SubTitle")}
                  />
                  <Error errorName={errors.quick_delivery_subtitle} />
                </div>
              </div>
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="quick_delivery_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.quick_delivery_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Description")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Quick Delivery Description"
                    name="quick_delivery_description"
                    type="text"
                    placeholder={t("QuickDeliverySectionTitle")}
                  />
                  <Error errorName={errors.quick_delivery_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ButtonName")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Name "
                    name="quick_delivery_button"
                    type="text"
                    placeholder={t("ButtonName")}
                  />
                  <Error errorName={errors.quick_delivery_button} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ButtonLink")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Link"
                    name="quick_delivery_link"
                    type="text"
                    placeholder="https://kachabazar-store.vercel.app/search?category=fruits-vegetable&_id=632aca2b4d87ff2494210be8"
                  />
                  <Error errorName={errors.quick_delivery_link} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Image")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={quickSectionImage}
                    setImageUrl={setQuickSectionImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  ====================================================== Latest Discounted Products ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 md:mt-0 mt-10">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" />{" "}
            {t("LatestDiscountedProductsTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setLatestDiscounted}
                  processOption={latestDiscounted}
                  name={latestDiscounted}
                />
              </div>
            </div>

            <div
              style={{
                height: latestDiscounted ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !latestDiscounted ? "hidden" : "visible",
                opacity: !latestDiscounted ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="latest_discount_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.latest_discount_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Description")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Latest Discount Description"
                    name="latest_discount_description"
                    type="text"
                    placeholder={t("LatestDiscountDescription")}
                  />
                  <Error errorName={errors.latest_discount_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ProductsLimit")}
                </label>
                <div className="sm:col-span-4">
                  <SelectProductLimit
                    register={register}
                    required={true}
                    label="Latest Discount Products Limit"
                    name="latest_discount_product_limit"
                  />
                  <Error errorName={errors.latest_discount_product_limit} />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-row-reverse pb-6">
                  <Button type="submit" className="h-10 px-6">
                    Save
                  </Button>
                </div> */}
          </div>
        </div>

        {/*  ====================================================== Get Your Daily Needs Banner Section ====================================================== */}
        <div
          className={`col-span-12 md:col-span-12 lg:col-span-12 ${
            window.innerWidth < 400 ? "md:my-0 my-24" : "md:my-0 my-24"
          }`}
        >
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" /> {t("GetYourDailyNeedsTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title={""}
                  handleProcess={setDailyNeeds}
                  processOption={dailyNeeds}
                  name={dailyNeeds}
                />
              </div>
            </div>

            <div
              style={{
                height: dailyNeeds ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !dailyNeeds ? "hidden" : "visible",
                opacity: !dailyNeeds ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="daily_need_title"
                    type="text"
                    placeholder={t("Title")}
                  />
                  <Error errorName={errors.daily_need_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Description")}
                </label>
                <div className="sm:col-span-4">
                  <TextAreaCom
                    register={register}
                    label="Daily Need Description"
                    name="daily_need_description"
                    type="text"
                    placeholder={t("DailyNeedDescription")}
                  />
                  <Error errorName={errors.daily_need_description} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ImageLeft")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={getYourDailyNeedImageLeft}
                    setImageUrl={setGetYourDailyNeedImageLeft}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("ImageRight")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={getYourDailyNeedImageRight}
                    setImageUrl={setGetYourDailyNeedImageRight}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Button1image")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={getButton1image}
                    setImageUrl={setGetButton1image}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Button1Link")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Link "
                    name="daily_need_app_link"
                    type="text"
                    placeholder="https://kachabazar-store.vercel.app/search?category=fruits-vegetable&_id=632aca2b4d87ff2494210be8"
                  />
                  <Error errorName={errors.daily_need_app_link} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Button2image")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={getButton2image}
                    setImageUrl={setGetButton2image}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Button2Link")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Button Link "
                    name="daily_need_google_link"
                    type="text"
                    placeholder="https://kachabazar-store.vercel.app/search?category=fruits-vegetable&_id=632aca2b4d87ff2494210be8"
                  />
                  <Error errorName={errors.daily_need_google_link} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  ====================================================== Feature Promo Section ====================================================== */}
        <div
          className={`col-span-12 md:col-span-12 lg:col-span-12 ${
            window.innerWidth < 400 ? "md:mt-0 mt-40" : "md:mt-0 mt-10"
          }`}
        >
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" /> {t("FeaturePromoSectionTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFeaturePromo}
                  processOption={featurePromo}
                  name={featurePromo}
                />
              </div>
            </div>

            <div
              style={{
                height: featurePromo ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !featurePromo ? "hidden" : "visible",
                opacity: !featurePromo ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FreeShipping")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="promo_free_shipping"
                    type="text"
                    placeholder="From $500.00"
                  />
                  <Error errorName={errors.promo_free_shipping} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Support")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="promo_support"
                    type="text"
                    placeholder="24/7 At Anytime"
                  />
                  <Error errorName={errors.promo_support} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("SecurePayment")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="promo_payment"
                    type="text"
                    placeholder={t("SecurePayment")}
                  />
                  <Error errorName={errors.promo_payment} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("LatestOffer")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="promo_offer"
                    type="text"
                    placeholder="Upto 20% Off"
                  />
                  <Error errorName={errors.promo_offer} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  ====================================================== Footer Section ====================================================== */}
        <div className="col-span-12 md:col-span-12 lg:col-span-12 md:mt-0 mt-10">
          <div className="inline-flex md:text-lg text-base text-gray-800 font-semibold dark:text-gray-400 mb-3">
            <FiSettings className="mt-1 mr-2" /> {t("FooterTitle")}
          </div>

          <hr className="md:mb-12 mb-3" />

          <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full pb-0">
            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
              <strong>{t("Block")} 1</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterBlock1}
                  processOption={footerBlock1}
                  name={footerBlock1}
                />
              </div>
            </div>

            <div
              style={{
                height: footerBlock1 ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerBlock1 ? "hidden" : "visible",
                opacity: !footerBlock1 ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-4">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_title"
                    type="text"
                    placeholder="Company"
                  />
                  <Error errorName={errors.footer_block_one_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 1
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_one_title"
                    type="text"
                    placeholder={t("AboutUs")}
                  />
                  <Error errorName={errors.footer_block_one_link_one_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4 mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_one"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_one_link_one} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 2
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_two_title"
                    type="text"
                    placeholder={t("ContactUs")}
                  />
                  <Error errorName={errors.footer_block_one_link_two_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_two"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_one_link_two} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 3
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_three_title"
                    type="text"
                    placeholder={t("Careers")}
                  />
                  <Error errorName={errors.footer_block_one_link_three_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_three"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_one_link_three} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 4
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_four_title"
                    type="text"
                    placeholder={t("LatestNews")}
                  />
                  <Error errorName={errors.footer_block_one_link_four_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4 mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_one_link_four"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_one_link_four} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative md:mt-0 mt-24">
              <strong>{t("Block")} 2</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterBlock2}
                  processOption={footerBlock2}
                  name={footerBlock2}
                />
              </div>
            </div>

            <div
              style={{
                height: footerBlock2 ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerBlock2 ? "hidden" : "visible",
                opacity: !footerBlock2 ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_title"
                    type="text"
                    placeholder={t("TopCategory")}
                  />
                  <Error errorName={errors.footer_block_two_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 1
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_one_title"
                    type="text"
                    placeholder={t("FishAndMeat")}
                  />
                  <Error errorName={errors.footer_block_two_link_one_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_one"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_two_link_one} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 2
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_two_title"
                    type="text"
                    placeholder={t("SoftDrinks")}
                  />
                  <Error errorName={errors.footer_block_two_link_two_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_two"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_two_link_two} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 3
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_three_title"
                    type="text"
                    placeholder={t("BabyCare")}
                  />
                  <Error errorName={errors.footer_block_two_link_three_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_three"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_two_link_three} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 4
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_four_title"
                    type="text"
                    placeholder={t("BeautyAndHealth")}
                  />
                  <Error errorName={errors.footer_block_two_link_four_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_two_link_four"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_two_link_four} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative md:mt-0 mt-24">
              <strong>{t("Block")} 3</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterBlock3}
                  processOption={footerBlock3}
                  name={footerBlock3}
                />
              </div>
            </div>

            <div
              style={{
                height: footerBlock3 ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerBlock3 ? "hidden" : "visible",
                opacity: !footerBlock3 ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Title")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_title"
                    type="text"
                    placeholder="My Account"
                  />
                  <Error errorName={errors.footer_block_three_title} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 1
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_one_title"
                    type="text"
                    placeholder={t("Dashboard")}
                  />
                  <Error errorName={errors.footer_block_three_link_one_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_one"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_three_link_one} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 2
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_two_title"
                    type="text"
                    placeholder={t("MyOrders")}
                  />
                  <Error errorName={errors.footer_block_three_link_two_title} />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_two"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_three_link_two} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 3
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_three_title"
                    type="text"
                    placeholder="Recent Orders"
                  />
                  <Error
                    errorName={errors.footer_block_three_link_three_title}
                  />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_three"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_three_link_three} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-1">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("Link")} 4
                </label>

                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_four_title"
                    type="text"
                    placeholder="Updated Profile"
                  />
                  <Error
                    errorName={errors.footer_block_three_link_four_title}
                  />
                </div>
                <label className="md:col-span-1 sm:col-span-2"></label>
                <div className="sm:col-span-4  mb-5">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_three_link_four"
                    type="text"
                    placeholder={t("Link")}
                  />
                  <Error errorName={errors.footer_block_three_link_four} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative md:mt-0 mt-24">
              <strong>{t("Block")} 4</strong>
            </div>

            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterBlock4}
                  processOption={footerBlock4}
                  name={footerBlock4}
                />
              </div>
            </div>

            <div
              style={{
                height: footerBlock4 ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerBlock4 ? "hidden" : "visible",
                opacity: !footerBlock4 ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FooterLogo")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader imageUrl={footerLogo} setImageUrl={setFooterLogo} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FooterAddress")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_four_address"
                    type="text"
                    placeholder="Address"
                  />
                  <Error errorName={errors.footer_block_four_address} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FooterPhone")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_four_phone"
                    type="text"
                    placeholder={t("Phone")}
                  />
                  <Error errorName={errors.footer_block_four_phone} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("FooterEmail")}
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="footer_block_four_email"
                    type="text"
                    placeholder="Email"
                  />
                  <Error errorName={errors.footer_block_four_email} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative mt-24 md:mt-0">
              <strong>{t("SocialLinks")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterSocialLinks}
                  processOption={footerSocialLinks}
                  name={footerSocialLinks}
                />
              </div>
            </div>

            <div
              style={{
                height: footerSocialLinks ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerSocialLinks ? "hidden" : "visible",
                opacity: !footerSocialLinks ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Facebook
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="social_facebook"
                    type="text"
                    placeholder="Facebook link"
                  />
                  <Error errorName={errors.social_facebook} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Twitter
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="social_twitter"
                    type="text"
                    placeholder="Twitter Link"
                  />
                  <Error errorName={errors.social_twitter} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Pinterest
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="social_pinterest"
                    type="text"
                    placeholder="Pinterest Link"
                  />
                  <Error errorName={errors.social_pinterest} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Linkedin
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="social_linkedin"
                    type="text"
                    placeholder="Linkedin Link"
                  />
                  <Error errorName={errors.social_linkedin} />
                </div>
              </div>

              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  WhatsApp
                </label>
                <div className="sm:col-span-4">
                  <InputAreaTwo
                    register={register}
                    label="Title"
                    name="social_whatsapp"
                    type="text"
                    placeholder="whatsApp Link"
                  />
                  <Error errorName={errors.social_whatsapp} />
                </div>
              </div>
            </div>

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative mt-24 md:mt-0">
              <strong>{t("PaymentMethod")}</strong>
            </div>
            <hr className="md:mb-12 mb-3" />
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterPaymentMethod}
                  processOption={footerPaymentMethod}
                  name={footerPaymentMethod}
                />
              </div>
            </div>

            <div
              style={{
                height: footerPaymentMethod ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerPaymentMethod ? "hidden" : "visible",
                opacity: !footerPaymentMethod ? "0" : "1",
              }}
            >
              <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  {t("PaymentMethod")}
                </label>
                <div className="sm:col-span-4">
                  <Uploader
                    imageUrl={paymentImage}
                    setImageUrl={setPaymentImage}
                  />
                </div>
              </div>
            </div>

            {/* <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
                  <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Visibility
                  </label>
                  <div className="sm:col-span-4">
                    <SwitchToggle
                      title={""}
                      // handleProcess={setSliderFullWidth}
                      // processOption={}
                    />
                  </div>
                </div> */}

            <div className="inline-flex md:text-base text-sm mb-3 text-gray-500 dark:text-gray-400 relative mt-16 md:mt-0">
              <strong>{t("FooterBottomContact")}</strong>
            </div>

            <hr className="md:mb-12 mb-3" />

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("EnableThisBlock")}
              </label>
              <div className="sm:col-span-4">
                <SwitchToggle
                  title=""
                  handleProcess={setFooterBottomContact}
                  processOption={footerBottomContact}
                  name={footerBottomContact}
                />
              </div>
            </div>

            <div
              style={{
                height: footerBottomContact ? "auto" : 0,
                transition: "all 0.5s",
                visibility: !footerBottomContact ? "hidden" : "visible",
                opacity: !footerBottomContact ? "0" : "1",
              }}
              className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3"
            >
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("FooterBottomContact")}
              </label>
              <div className="sm:col-span-4 mb-20 md:mb-0">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="footer_Bottom_Contact"
                  type="text"
                  placeholder={t("FooterBottomContact")}
                />
                <Error errorName={errors.footer_Bottom_Contact} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
