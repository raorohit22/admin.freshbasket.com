import { Button, Card, CardBody } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

//internal import

import LanguageDrawer from "@/components/drawer/LanguageDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import CurrencyDrawer from "@/components/drawer/CurrencyDrawer";

const Localization = ({ children, title, addButton }) => {
  const { toggleDrawer } = useContext(SidebarContext);

  const { t } = useTranslation();

  return (
    <>
      <MainDrawer>
        {title === "Languages" && <LanguageDrawer />}
        {title === "Currencies" && <CurrencyDrawer />}
      </MainDrawer>

      <div className="flex justify-between">
        <PageTitle> {title ? title : "Localization"}</PageTitle>{" "}
        <div className="flex items-center md:w-56 lg:w-56 xl:w-56 justify-end">
          {title === "Currencies" && (
            <Button onClick={toggleDrawer} className="rounded-md h-12">
              <span className="mr-3">
                <FiPlus />
              </span>
              {t("AddBtn")} {addButton}
            </Button>
          )}
          {title === "Languages" && (
            <Button onClick={toggleDrawer} className="rounded-md h-12">
              <span className="mr-3">
                <FiPlus />
              </span>
              {t("AddBtn")} {addButton}
            </Button>
          )}
        </div>
      </div>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-400 mb-5">
        <CardBody>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7">
            <Link to="/localization" className="mx-3 font-medium font-serif">
              {t("Localization")}
            </Link>
            <Link
              to="/localization/languages"
              className="mx-3 font-medium font-serif"
            >
              {t("Languages")}
            </Link>
            <Link
              to="/localization/currencies"
              className="mx-3 font-medium font-serif"
            >
              {t("Currencies")}
            </Link>
            <Link
              to="/localization/geolocation"
              className="mx-3 font-medium font-serif"
            >
              {t("Geolocation")}
            </Link>
            {/* <Link to="/localization/geolocation" className="mx-3">
              {t('Geolocation')}
            </Link> */}
          </div>
        </CardBody>
      </Card>
      {children}
    </>
  );
};

export default Localization;
