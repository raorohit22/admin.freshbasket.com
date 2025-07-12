import Switch from "react-switch";

const SwitchToggle = ({ id, title, handleProcess, processOption }) => {
  return (
    <>
      <div className={`${"mb-3"}`}>
        <div className="flex flex-wrap items-center">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {title}
          </label>

          <Switch
            id={id || title || ""}
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

export default SwitchToggle;
