import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";

const StoreTabList = () => {
  const { t } = useTranslation();

  return (
    <>
      <ul className="sm:flex grid grid-cols-3 text-sm font-medium text-center text-gray-500 sm:divide-x divide-gray-200 rounded-lg dark:divide-gray-700 dark:text-gray-400 mb-5">
        <li>
          <Link
            to={"/store/customization?storeTab=home-settings"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500 rounded-l-md`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("HomeSettings")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-1
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=single-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("SingleSetting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-2
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=about-us-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("AboutUsSetting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-3
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=privacy-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("PrivacyTCSetting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-4
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=FAQ-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("FAQSetting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-5
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=offers-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("OffersStting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-6
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={"/store/customization?storeTab=contact-us-setting"}
            className={`inline-block w-full p-4 shadow bg-white hover:text-white hover:bg-emerald-500  focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-emerald-500`}
          >
            <span className="text-sm font-medium font-serif xl:inline-block hidden">
              {t("ContactUsStting")}
            </span>
            <span className="text-sm font-medium font-serif xl:hidden">
              Tab-7
            </span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default StoreTabList;
