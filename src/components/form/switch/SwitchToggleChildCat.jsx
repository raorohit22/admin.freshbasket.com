import Switch from "react-switch";
import { useTranslation } from "react-i18next";

const SwitchToggleChildCat = ({ title, handleProcess, processOption }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`${"mb-3"}`}>
        <div className="flex flex-wrap items-center float-right">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {title}
          </label>

          <Switch
            onChange={handleProcess}
            checked={processOption}
            className="react-switch md:ml-0 ml-3"
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "white",
                  paddingRight: 50,
                  paddingTop: 1,
                  marginLeft: -40,
                  whiteSpace: "nowrap",
                }}
              >
                {t("ParentsOnly")}
              </div>
            }
            width={115}
            height={28}
            handleDiameter={26}
            offColor="#0e9f6e"
            onColor="#2F855A"
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 12,
                  color: "white",
                  paddingLeft: 8,
                  paddingTop: 1,
                }}
              >
                {t("All")}
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default SwitchToggleChildCat;
