import Switch from "react-switch";
import { useTranslation } from "react-i18next";

const SwitchToggleForCombination = ({
  title,
  product,
  handleProcess,
  processOption,
}) => {
  // console.log('processOption',processOption)
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`${
          product ? "mb-3 flex flex-wrap justify-end items-center mr-8" : "mb-3"
        }`}
        style={{
          height: product ? 20 : 0,
          transition: "all 0.3s",
          visibility: product ? "visible" : "hidden",
          opacity: product ? "1" : "0",
        }}
      >
        <div className="flex flex-wrap items-center">
          {product ? (
            <label className="block text-base font-normal text-orange-500 dark:text-orange-400 mx-4">
              {t("ThisProductHaveVariants")}
            </label>
          ) : (
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {title}
            </label>
          )}

          <Switch
            onChange={handleProcess}
            checked={processOption}
            className="react-switch md:ml-0 ml-3"
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 14,
                  color: "white",
                  paddingRight: 5,
                  paddingTop: 1,
                }}
              >
                No
              </div>
            }
            width={80}
            height={30}
            handleDiameter={28}
            offColor="#E53E3E"
            onColor="#2F855A"
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 14,
                  color: "white",
                  paddingLeft: 8,
                  paddingTop: 1,
                }}
              >
                Yes
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default SwitchToggleForCombination;
