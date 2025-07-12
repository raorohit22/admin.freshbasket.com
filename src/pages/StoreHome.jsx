import { useContext, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

//internal import
import useQuery from "@/hooks/useQuery";
import Faq from "@/components/store-home/Faq";
import Offer from "@/components/store-home/Offer";
import AboutUs from "@/components/store-home/AboutUs";
import ContactUs from "@/components/store-home/ContactUs";
import { SidebarContext } from "@/context/SidebarContext";
import useStoreHomeSubmit from "@/hooks/useStoreHomeSubmit";
import PageTitle from "@/components/Typography/PageTitle";
import PrivacyPolicy from "@/components/store-home/PrivacyPolicy";
import HomePage from "@/components/store-home/HomePage";
import SinglePage from "@/components/store-home/SinglePage";
import Checkout from "@/components/store-home/Checkout";
import SeoSetting from "@/components/settings/SeoSetting";
import DashboardSetting from "@/components/store-home/DashboardSetting";
import SelectLanguageTwo from "@/components/form/selectOption/SelectLanguageTwo";
import AnimatedContent from "@/components/common/AnimatedContent";

const StoreHome = () => {
  let location = useLocation();
  let query = useQuery();
  const { t } = useTranslation();

  const tabName = query.get("storeTab");
  const { setTabIndex } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    onSubmit,
    lang,
    errors,
    favicon,
    coupons,
    setFavicon,
    metaImg,
    setMetaImg,
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
    handleSelectLanguage,
    singleProductPageRightBox,
    setSingleProductPageRightBox,
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
    setAboutHeaderBg,
    aboutHeaderBg,
    setAboutPageHeader,
    aboutPageHeader,
    setAboutTopContentLeft,
    aboutTopContentLeft,
    setAboutTopContentRight,
    aboutTopContentRight,
    setAboutTopContentRightImage,
    aboutTopContentRightImage,
    setAboutMiddleContentSection,
    aboutMiddleContentSection,
    setAboutMiddleContentImage,
    aboutMiddleContentImage,
    setOurFounderSection,
    ourFounderSection,
    setOurFounderOneImage,
    ourFounderOneImage,
    setOurFounderTwoImage,
    ourFounderTwoImage,
    setOurFounderThreeImage,
    ourFounderThreeImage,
    setOurFounderFourImage,
    ourFounderFourImage,
    setOurFounderFiveImage,
    ourFounderFiveImage,
    setOurFounderSixImage,
    ourFounderSixImage,
    setPrivacyPolicy,
    privacyPolicy,
    setPrivacyPolicyHeaderBg,
    privacyPolicyHeaderBg,
    setTermsConditions,
    termsConditions,
    setTermsConditionsHeaderBg,
    termsConditionsHeaderBg,
    setFaqStatus,
    faqStatus,
    setFaqHeaderBg,
    faqHeaderBg,
    setFaqLeftColImage,
    faqLeftColImage,
    setOffersPageHeader,
    offersPageHeader,
    setOffersHeaderBg,
    offersHeaderBg,
    setContactPageHeader,
    contactPageHeader,
    setContactHeaderBg,
    contactHeaderBg,
    setEmailUsBox,
    emailUsBox,
    setCallUsBox,
    callUsBox,
    setAddressBox,
    addressBox,
    setContactMidLeftColStatus,
    contactMidLeftColStatus,
    setContactMidLeftColImage,
    contactMidLeftColImage,
    setContactFormStatus,
    contactFormStatus,
    couponList,
    setCouponList,
    couponList1,
    setCouponList1,
    setFaqLeftColStatus,
    faqLeftColStatus,
    setFaqRightColStatus,
    faqRightColStatus,
    textEdit,
    setTextEdit,
    termsConditionsTextEdit,
    isSubmitting,
    // showChild,
    setTermsConditionsTextEdit,
  } = useStoreHomeSubmit();

  useEffect(() => {
    if (tabName === "seo-setting") {
      setTabIndex(9);
    } else if (tabName === "dashboard-setting") {
      setTabIndex(8);
    } else if (tabName === "checkout-setting") {
      setTabIndex(7);
    } else if (tabName === "contact-us-setting") {
      setTabIndex(6);
    } else if (tabName === "offers-setting") {
      setTabIndex(5);
    } else if (tabName === "FAQ-setting") {
      setTabIndex(4);
    } else if (tabName === "privacy-setting") {
      setTabIndex(3);
    } else if (tabName === "about-us-setting") {
      setTabIndex(2);
    } else if (tabName === "single-setting") {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [tabName, setTabIndex]);

  useEffect(() => {
    isCoupon && setIsSliderFullWidth(false);
  }, [isCoupon, setIsSliderFullWidth]);

  useEffect(() => {
    leftRightArrow && setBottomDots(false);
  }, [leftRightArrow, setBottomDots]);

  useEffect(() => {
    leftRightArrow && setBothSliderOption(false);
  }, [leftRightArrow, setBothSliderOption]);

  useEffect(() => {
    bottomDots && setBothSliderOption(false);
  }, [bottomDots, setBothSliderOption]);

  useEffect(() => {
    bottomDots && setLeftRightArrow(false);
  }, [bottomDots, setLeftRightArrow]);

  useEffect(() => {
    bothSliderOption && setLeftRightArrow(false);
  }, [bothSliderOption, setLeftRightArrow]);

  useEffect(() => {
    bothSliderOption && setBottomDots(false);
  }, [bothSliderOption, setBottomDots]);

  return (
    <>
      <div className="flex justify-between text-center items-center">
        <div>
          <PageTitle>{t("StoreCustomizationPageTitle")}</PageTitle>
        </div>
        <div className="pb-4">
          <SelectLanguageTwo
            register={register}
            handleSelectLanguage={handleSelectLanguage}
          />
        </div>
      </div>

      <>
        <ul className="sm:flex grid grid-cols-3 text-sm font-medium text-center text-gray-500 sm:divide-x divide-gray-200 rounded-lg dark:divide-gray-700 dark:text-gray-400 mb-5">
          <li>
            <Link
              to={"/store/customization?storeTab=home-settings"}
              className={`inline-block w-full px-4 py-3 shadow-md ${
                tabName === "home-settings" || location.search === ""
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500 sm:rounded-l-md rounded-tl-md`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("HomeSettings")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {tabName === "home-settings" || location.search === ""
                  ? "Home"
                  : "Home"}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=single-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "single-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("SingleSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {"Setting"}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=about-us-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "about-us-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500 focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500 sm:rounded-tr-none rounded-tr-md`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("AboutUsSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {"About"}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=privacy-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "privacy-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("PrivacyTCSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {"Privacy"}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=FAQ-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "FAQ-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("FAQSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {t("FAQSetting")}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=offers-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "offers-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("OffersStting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {t("OffersStting")}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/store/customization?storeTab=contact-us-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "contact-us-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500 sm:rounded-bl-none rounded-bl-md`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("ContactUsStting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                Contact
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/store/customization?storeTab=checkout-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "checkout-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500 sm:rounded-bl-none rounded-bl-md`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("Checkout")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {t("Checkout")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/store/customization?storeTab=dashboard-setting"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "dashboard-setting"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500 sm:rounded-bl-none rounded-bl-md`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("DashboardSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {t("Dashboard")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/store/customization?storeTab=seo-settings"}
              className={`inline-block w-full py-3 px-4 shadow-md ${
                tabName === "seo-settings"
                  ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
                  : "bg-gray-200 text-gray-800 font-medium dark:bg-gray-600 dark:text-gray-300"
              } hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:hover:bg-emerald-500`}
            >
              <span className="text-sm font-medium font-serif xl:inline-block hidden">
                {t("SeoSetting")}
              </span>
              <span className="text-sm font-medium font-serif xl:hidden">
                {"Seo"}
              </span>
            </Link>
          </li>
        </ul>

        {/************ TabPanel 1 ************/}
        {(tabName === "home-settings" || tabName === null) && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <HomePage
                  errors={errors}
                  isSave={isSave}
                  coupons={coupons}
                  isCoupon={isCoupon}
                  register={register}
                  headerLogo={headerLogo}
                  footerLogo={footerLogo}
                  setFooterLogo={setFooterLogo}
                  paymentImage={paymentImage}
                  setPaymentImage={setPaymentImage}
                  setHeaderLogo={setHeaderLogo}
                  sliderImage={sliderImage}
                  setSliderImage={setSliderImage}
                  sliderImageTwo={sliderImageTwo}
                  setSliderImageTwo={setSliderImageTwo}
                  sliderImageThree={sliderImageThree}
                  setSliderImageThree={setSliderImageThree}
                  sliderImageFour={sliderImageFour}
                  setSliderImageFour={setSliderImageFour}
                  sliderImageFive={sliderImageFive}
                  setSliderImageFive={setSliderImageFive}
                  placeholderImage={placeholderImage}
                  setPlaceHolderImage={setPlaceHolderImage}
                  quickSectionImage={quickSectionImage}
                  setQuickSectionImage={setQuickSectionImage}
                  getYourDailyNeedImageLeft={getYourDailyNeedImageLeft}
                  setGetYourDailyNeedImageLeft={setGetYourDailyNeedImageLeft}
                  getYourDailyNeedImageRight={getYourDailyNeedImageRight}
                  setGetYourDailyNeedImageRight={setGetYourDailyNeedImageRight}
                  isSliderFullWidth={isSliderFullWidth}
                  setIsCoupon={setIsCoupon}
                  setIsSliderFullWidth={setIsSliderFullWidth}
                  featuredCategories={featuredCategories}
                  setFeaturedCategories={setFeaturedCategories}
                  popularProducts={popularProducts}
                  setPopularProducts={setPopularProducts}
                  setQuickDelivery={setQuickDelivery}
                  quickDelivery={quickDelivery}
                  setLatestDiscounted={setLatestDiscounted}
                  latestDiscounted={latestDiscounted}
                  setDailyNeeds={setDailyNeeds}
                  dailyNeeds={dailyNeeds}
                  setFeaturePromo={setFeaturePromo}
                  featurePromo={featurePromo}
                  setFooterBlock1={setFooterBlock1}
                  footerBlock1={footerBlock1}
                  setFooterBlock2={setFooterBlock2}
                  footerBlock2={footerBlock2}
                  setFooterBlock3={setFooterBlock3}
                  footerBlock3={footerBlock3}
                  setFooterBlock4={setFooterBlock4}
                  footerBlock4={footerBlock4}
                  setFooterSocialLinks={setFooterSocialLinks}
                  footerSocialLinks={footerSocialLinks}
                  setFooterPaymentMethod={setFooterPaymentMethod}
                  footerPaymentMethod={footerPaymentMethod}
                  allowPromotionBanner={allowPromotionBanner}
                  setAllowPromotionBanner={setAllowPromotionBanner}
                  setLeftRightArrow={setLeftRightArrow}
                  leftRightArrow={leftRightArrow}
                  setBottomDots={setBottomDots}
                  bottomDots={bottomDots}
                  setBothSliderOption={setBothSliderOption}
                  bothSliderOption={bothSliderOption}
                  getButton1image={getButton1image}
                  setGetButton1image={setGetButton1image}
                  getButton2image={getButton2image}
                  setGetButton2image={setGetButton2image}
                  setFooterBottomContact={setFooterBottomContact}
                  footerBottomContact={footerBottomContact}
                  setCategoriesMenuLink={setCategoriesMenuLink}
                  categoriesMenuLink={categoriesMenuLink}
                  setAboutUsMenuLink={setAboutUsMenuLink}
                  aboutUsMenuLink={aboutUsMenuLink}
                  setContactUsMenuLink={setContactUsMenuLink}
                  contactUsMenuLink={contactUsMenuLink}
                  setOffersMenuLink={setOffersMenuLink}
                  offersMenuLink={offersMenuLink}
                  setFaqMenuLink={setFaqMenuLink}
                  faqMenuLink={faqMenuLink}
                  setPrivacyPolicyMenuLink={setPrivacyPolicyMenuLink}
                  privacyPolicyMenuLink={privacyPolicyMenuLink}
                  setTermsConditionsMenuLink={setTermsConditionsMenuLink}
                  termsConditionsMenuLink={termsConditionsMenuLink}
                  couponList={couponList}
                  setCouponList={setCouponList}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}

        {/************ TabPanel 1 END************/}

        {/************* TabPanel 2*************/}
        {tabName === "single-setting" && (
          <AnimatedContent>
            <div className="sm:container w-full md:p-6 p-4 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <SinglePage
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  isSubmitting={isSubmitting}
                  singleProductPageRightBox={singleProductPageRightBox}
                  setSingleProductPageRightBox={setSingleProductPageRightBox}
                />
              </form>
            </div>
          </AnimatedContent>
        )}

        {/************* TabPanel 2 END *************/}

        {/************* TabPanel 3*************/}
        {tabName === "about-us-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AboutUs
                  isSave={isSave}
                  register={register}
                  errors={errors}
                  setAboutHeaderBg={setAboutHeaderBg}
                  aboutHeaderBg={aboutHeaderBg}
                  setAboutPageHeader={setAboutPageHeader}
                  aboutPageHeader={aboutPageHeader}
                  setAboutTopContentLeft={setAboutTopContentLeft}
                  aboutTopContentLeft={aboutTopContentLeft}
                  setAboutTopContentRight={setAboutTopContentRight}
                  aboutTopContentRight={aboutTopContentRight}
                  setAboutTopContentRightImage={setAboutTopContentRightImage}
                  aboutTopContentRightImage={aboutTopContentRightImage}
                  setAboutMiddleContentSection={setAboutMiddleContentSection}
                  aboutMiddleContentSection={aboutMiddleContentSection}
                  setAboutMiddleContentImage={setAboutMiddleContentImage}
                  aboutMiddleContentImage={aboutMiddleContentImage}
                  setOurFounderSection={setOurFounderSection}
                  ourFounderSection={ourFounderSection}
                  setOurFounderOneImage={setOurFounderOneImage}
                  ourFounderOneImage={ourFounderOneImage}
                  setOurFounderTwoImage={setOurFounderTwoImage}
                  ourFounderTwoImage={ourFounderTwoImage}
                  setOurFounderThreeImage={setOurFounderThreeImage}
                  ourFounderThreeImage={ourFounderThreeImage}
                  setOurFounderFourImage={setOurFounderFourImage}
                  ourFounderFourImage={ourFounderFourImage}
                  setOurFounderFiveImage={setOurFounderFiveImage}
                  ourFounderFiveImage={ourFounderFiveImage}
                  setOurFounderSixImage={setOurFounderSixImage}
                  ourFounderSixImage={ourFounderSixImage}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 3 END*************/}

        {/************* TabPanel 4 *************/}
        {tabName === "privacy-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <PrivacyPolicy
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  textEdit={textEdit}
                  setTextEdit={setTextEdit}
                  privacyPolicy={privacyPolicy}
                  setPrivacyPolicy={setPrivacyPolicy}
                  setPrivacyPolicyHeaderBg={setPrivacyPolicyHeaderBg}
                  privacyPolicyHeaderBg={privacyPolicyHeaderBg}
                  setTermsConditions={setTermsConditions}
                  termsConditions={termsConditions}
                  setTermsConditionsHeaderBg={setTermsConditionsHeaderBg}
                  termsConditionsHeaderBg={termsConditionsHeaderBg}
                  termsConditionsTextEdit={termsConditionsTextEdit}
                  setTermsConditionsTextEdit={setTermsConditionsTextEdit}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 4 END*************/}

        {/************* TabPanel 5 *************/}
        {tabName === "FAQ-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 mx-auto w-full bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Faq
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  setFaqStatus={setFaqStatus}
                  faqStatus={faqStatus}
                  setFaqHeaderBg={setFaqHeaderBg}
                  faqHeaderBg={faqHeaderBg}
                  setFaqLeftColImage={setFaqLeftColImage}
                  faqLeftColImage={faqLeftColImage}
                  setFaqLeftColStatus={setFaqLeftColStatus}
                  faqLeftColStatus={faqLeftColStatus}
                  setFaqRightColStatus={setFaqRightColStatus}
                  faqRightColStatus={faqRightColStatus}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 5 END*************/}

        {/************* TabPanel 6 *************/}
        {tabName === "offers-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Offer
                  errors={errors}
                  isSave={isSave}
                  register={register}
                  coupons={coupons}
                  setOffersPageHeader={setOffersPageHeader}
                  offersPageHeader={offersPageHeader}
                  setOffersHeaderBg={setOffersHeaderBg}
                  offersHeaderBg={offersHeaderBg}
                  couponList1={couponList1}
                  setCouponList1={setCouponList1}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 6 END*************/}

        {/************* TabPanel 7 *************/}
        {tabName === "contact-us-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <ContactUs
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  setContactPageHeader={setContactPageHeader}
                  contactPageHeader={contactPageHeader}
                  setContactHeaderBg={setContactHeaderBg}
                  contactHeaderBg={contactHeaderBg}
                  setEmailUsBox={setEmailUsBox}
                  emailUsBox={emailUsBox}
                  setCallUsBox={setCallUsBox}
                  callUsBox={callUsBox}
                  setAddressBox={setAddressBox}
                  addressBox={addressBox}
                  setContactMidLeftColStatus={setContactMidLeftColStatus}
                  contactMidLeftColStatus={contactMidLeftColStatus}
                  setContactMidLeftColImage={setContactMidLeftColImage}
                  contactMidLeftColImage={contactMidLeftColImage}
                  setContactFormStatus={setContactFormStatus}
                  contactFormStatus={contactFormStatus}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 7 END*************/}
        {/************* TabPanel 8 *************/}
        {tabName === "checkout-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Checkout
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 8 END*************/}
        {/************* TabPanel 9 *************/}
        {tabName === "dashboard-setting" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DashboardSetting
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
        {/************* TabPanel 9 END*************/}

        {tabName === "seo-settings" && (
          <AnimatedContent>
            <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <SeoSetting
                  isSave={isSave}
                  errors={errors}
                  register={register}
                  favicon={favicon}
                  setFavicon={setFavicon}
                  metaImg={metaImg}
                  setMetaImg={setMetaImg}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </AnimatedContent>
        )}
      </>
    </>
  );
};

export default StoreHome;
