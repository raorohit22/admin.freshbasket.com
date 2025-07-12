import Switch from 'react-switch';

const SwitchToggleFour = ({
  title,
  handleProcess,
  processOption,
  product,
  handleIsCombination,
}) => {
  return (
    <>
      <div
        className={`${
          product ? 'mb-3 flex flex-wrap justify-end items-center mr-8' : 'mb-3'
        }`}
      >
        <div className="flex flex-wrap items-center">
          {product ? (
            <label className="block text-base font-normal text-orange-500 dark:text-orange-400 mx-4">
              Does this product have variants?
            </label>
          ) : (
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {title}
            </label>
          )}

          <Switch
            onChange={product ? handleIsCombination : handleProcess}
            checked={processOption}
            className="react-switch"
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 14,
                  color: 'white',
                  paddingRight: 45,
                  paddingTop: 1,
                }}
              >
                Fixed
              </div>
            }
            width={125}
            height={33}
            handleDiameter={28}
            offColor="#E53E3E"
            onColor="#2F855A"
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: 14,
                  color: 'white',
                  paddingLeft: 50,
                  paddingTop: 1,
                }}
              >
                Percentage
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};

export default SwitchToggleFour;
